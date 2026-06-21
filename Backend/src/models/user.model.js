import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"username already taken"],

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"account already exist with this email address"]
    },
    password:{
        type:String ,
        required:[true,"password is required"]
    }
})
const userModel=mongoose.model("user",userSchema);

export default  userModel ;