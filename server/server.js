import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import dbConnect from './config/dbConnect.js'
import userRouter from './routers/userRouter.js'
import adminRouter from './routers/adminRouter.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve()+"/public"))
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
    ],
    credentials: true,
  })
);

dbConnect()

app.use('/',userRouter)
app.use('/admin',adminRouter)



app.listen(5000,()=>{
    console.log('server is running http://localhost:5000')
})