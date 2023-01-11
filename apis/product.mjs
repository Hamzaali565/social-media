import express from "express";
import { productModel, userModel } from "../dbRepo/Models.mjs";
import mongoose from "mongoose";

const router = express.Router();
router.post('/tweet', (req, res) => {

    const body = req.body;

    if ( // validation
        !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
    productModel.create(
        {
            description: body.description,
            owner: new mongoose.Types.ObjectId(body.token._id)
        },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    message: "Tweet added successfully",
                    // data: data,
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})

router.get('/tweets', (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.body.token._id);
    productModel.find({ owner: userId, isDeleted: false }, {},
        {
            sort: { "_id": -1 },
            limit: 100,
            skip: 0,
            populate: {
                path: "owner",
                select: "firstName lastName email"
            }
        },
        (err, data) => {
            if (!err) {
                res.send({
                    message: "got all tweets successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
})
// router.get('/tweetFeed', (req, res) => {
//     const userId = new mongoose.Types.ObjectId(req.body.token._id);
//     productModel.find({isDeleted: false }, {},
//         {
//             sort: { "_id": -1 },
//             limit: 100,
//             skip: 0
//         },
//         (err, data) => {
//             if (!err) {
//                 res.send({
//                     message: "got all tweets successfully",
//                     data: data
//                 })
//             } else {
//                 res.status(500).send({
//                     message: "server error"
//                 })
//             }
//         });
// })

// router.get('/tweet/:id', (req, res) => {

//     const id = req.params.id;

//     productModel.findOne({ _id: id }, (err, data) => {
//         if (!err) {

//             if (data) {
//                 res.send({
//                     message: `get product by id: ${data._id} success`,
//                     data: data
//                 });
//             } else {
//                 res.status(404).send({
//                     message: "product not found",
//                 })
//             }

//         } else {
//             res.status(500).send({
//                 message: "server error"
//             })
//         }
//     });

// })
//
// router.get('/tweet/:name', (req, res) => {
//     // console.log(req.params.name);
//     const queryName = req.params.name;

//     productModel.find({ name: { $regex: `${queryName}` } }
//         , (err, data) => {
//             if (!err) {
//                 if (data) {
//                     res.send({
//                         message: 'get product success',
//                         data: data,
//                     });
//                 } else {
//                     res.status(404).send({
//                         message: "product not found",
//                     });
//                 }
//             } else {
//                 res.status(500).send({
//                     message: "server error",
//                 });
//             }
//         });
// });

router.delete('/tweet/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    productModel.deleteOne
        ({
            _id: id,
            owner: new mongoose.Types.ObjectId(body.token._id) 
        }, (err, deletedData) => {
            console.log("deleted: ", deletedData);
            if (!err) {

                if (deletedData.deletedCount !== 0) {
                    res.send({
                        message: "Tweet has been deleted successfully",
                    })
                } else {
                    res.status(404);
                    res.send({
                        message: "No Tweet found with this id: " + id,
                    })
                }


            } else {
                res.status(500).send({
                    message: "server error"
                })
                console.log(err);
            }
        });
})

router.put('/tweet/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "description": "value"
        }`)
        return;
    }
    try {
        let data = await productModel.findOneAndUpdate
            ({
                _id: id,
                owner: new mongoose.Types.ObjectId(body.token._id)
            },
                {
                    description: body.description
                },
                { new: true }
            ).exec();
        console.log('updated: ', data);
        res.send({
            message: "Tweet modified successfully",
            data: data
        });
    }
    catch (error) {
        console.log("error: ", error)
        res.status(500).send({
            message: "server error"
        })
    }
})

export default router