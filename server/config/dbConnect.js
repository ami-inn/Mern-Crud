import mongoose from "mongoose";


function dbConnect(){
    mongoose.connect("mongodb://127.0.0.1/mern-crud").then(result=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("data base error \n"+err)
    })
}
export default dbConnect