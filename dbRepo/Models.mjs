import mongoose from 'mongoose';
mongoose.set('strictQuery', true);


let productSchema = new mongoose.Schema({
    owner: { type: mongoose.ObjectId, ref: "Users", required: true },
    isDeleted: { type: Boolean, default: false },
    description: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});
export const productModel = mongoose.model('products', productSchema);

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

    createdOn: { type: Date, default: Date.now },
});
export const userModel = mongoose.model('Users', userSchema);

const OTPSchema = new mongoose.Schema({
    otp: { type: String },
    email: { type: String },
    isUsed: {type: Boolean, default: false},
    createdOn: { type: Date, default: Date.now },
});
export const otpModel = mongoose.model('OTP', OTPSchema);

const mongodbURI = process.env.mongodbURI ||
    "mongodb+srv://CRUD:hamzaali565@cluster0.kh990zg.mongodb.net/posting?retryWrites=true&w=majority";
/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(mongodbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Database is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

