import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    about:{
        type:String,
        required:false
    },
    proffession:{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    profile:{
        type:String,
        default:"temp.JPEG"
    }
})

const UserModel=mongoose.model("Users", UserSchema)
export default UserModel