import express from "express";
import { userModel, productModel, otpModel } from "../dbRepo/Models.mjs";
import { customAlphabet, nanoid } from "nanoid";
// import { productModel, userModel } from "../dbRepo/Models.mjs";
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi";
import jwt from 'jsonwebtoken';
import { model } from "mongoose";
import moment from 'moment'

const SECRET = process.env.SECRET || "topsecret";
const router = express.Router();

router.post('/signup', (req, res) => {

    let body = req.body;

    if (!body.firstName
        || !body.lastName
        || !body.email
        || !body.password
    ) {
        res.status(400).send({ message: "Required Parameters Are Missing" });
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    // check if user already exist // query email user
    userModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log("user: ", user);

            if (user) { // user already exist
                console.log("user already exist: ", user);
                res.status(400).send({ message: "user already exist please try a different email" });
                return;

            } else { // user not already exist

                // bcrypt hash
                stringToHash(body.password).then(hashString => {

                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
});

router.post('/login', (req, res) => {

    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            {
                message: "Reqiured Parameters are Missing"
            }
        );
        return;
    }

    // check if user exist
    userModel.findOne(
        { email: body.email },
        "firstName lastName email password",
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                                sameSite: "none",
                                secure: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    age: data.age,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
})

router.post('/logout', (req, res) => {

    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    res.send({ message: "Logout successful" });
})


router.post('/forget-password', async (req, res) => {
    try {
        let body = req.body;
        body.email = body.email.toLowerCase();

        if (!body.email) { // null check - undefined, "", 0 , false, null , NaN
            res.status(400).send(
                {
                    message: "Reqiured Parameters are Missing"
                }
            );
            return;
        }

        // check if user exist
        // user existance check
        const user = await userModel.findOne(
            { email: body.email },
            "firstName lastName email"
        ).exec()
        if (!user) throw new Error("User Not Found")

        const nanoid = customAlphabet('1234567890', 5)
        const OTP = nanoid()
        console.log("OTP", OTP);
        const otpHash = await stringToHash(OTP);

        await otpModel.create({
            otp: otpHash,
            email: body.email
        })

        // TODO send OTP via email // postMark

        res.send({
            message: "OTP sent Successfully"
        });
        return;
    } catch (error) {
        console.log("err", error);
        res.status(500).send({ message: `${error}` })
    }
})
router.post('/forget-password-2', async (req, res) => {
    try {
        let body = req.body;
        body.email = body.email.toLowerCase();

        if (!body.email
            || !body.otp
            || !body.password
        ) {
            // null check - undefined, "", 0 , false, null , NaN
            throw new Error('Reqiured Parameters are Missing')

            // res.status(400).send(
            //     {
            //         message: "Reqiured Parameters are Missing"
            //     }
            // );
            // return;
        }

        // check if otp exist
        // otp existance check
        const otpRecord = await otpModel.findOne(
            {
                email: body.email,
                //   otp: body.otp
            }
        ).sort({
            _id: -1
        }).exec()

        if (!otpRecord) throw new Error("otp Not Found");
        if (otpRecord.isUsed) throw new Error("Invalid OTP");
        await otpRecord.update({ isUsed: true }).exec();
        console.log("new OTP", otpRecord);
        const now = moment()
        const otpCreateTime = moment(otpRecord.createdOn);
        const diffInMinutes = now.diff(otpCreateTime, "minute");
        console.log("diff in minutes", diffInMinutes);
        if (diffInMinutes >= 5) throw new Error("Invalid OTP Time");

        const isMatch = await varifyHash(body.otp, otpRecord.otp);
        if (!isMatch) throw new Error("invalid OTP match");
        const newHash = await stringToHash(body.password);
        await userModel.updateOne(
            { email: body.email },
            { password: newHash }
        ).exec();

        res.send({
            message: "Password updated Successfully"
        });

        return;

    } catch (error) {
        console.log("err", error);
        res.status(500).send({ message: `${error}` })
    }
})
export default router