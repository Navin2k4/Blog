import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
    }, {timeStamp:true} // To save the time of creaton and time of update
);

const User = mongoose.model('User',userSchema);

export default User;