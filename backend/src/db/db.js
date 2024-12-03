import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async() =>{
    try{
        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`Mongo DB connected !!`);
    }catch(error){
        console.log("MONGODB connection ERROR", error);
        process.exit(1);
    }
}

export default connectDB;