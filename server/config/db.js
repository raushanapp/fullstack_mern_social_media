import mongoose from "mongoose";
import dotenv from"dotenv";
dotenv.config();
mongoose.set('strictQuery', false)
const connectDB = () => {
    return mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
};

export default connectDB;