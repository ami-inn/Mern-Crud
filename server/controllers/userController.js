import UserModel from "../models/userModel";
import bcrypt from 'bcryptjs'
import Jwt from "jsonwebtoken";


var salt = bcrypt.genSaltSync(10)



export async function userSignup(req,res){
    try{

        const {name,email,password,about,proffession}=req.body

        const hashPassword=bcrypt.hashSync(password,salt)

        const user= await UserModel.findOne({email})

        if(user){
            return res.json({error:true, message:"User already exists"})
        }

        const newUser= new UserModel({name,email,password:hashPassword,about,proffession})

        await newUser.save()

        console.log(newUser)

        const token= Jwt.sign({
            id: newUser._id,
        },'myJwtsecretKey')
    
        return res.cookie('token', token,{
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({error: false});

    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: err });
    }
}