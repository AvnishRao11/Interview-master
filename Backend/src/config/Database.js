import mongoose from "mongoose";
import config from "./config.js";

const connectDB=async()=>{
    try{
        await mongoose.connect(config.MONGO_URI)
        .then
            console.log("connected to databsase sucessfully")
        
    }
    catch(err){
        console.log("error in connecting to db",err);
    }
}
export default connectDB;