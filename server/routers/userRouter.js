import express from 'express'
import multer from 'multer'
import { checkUserLoggedIn, userLogin, userLogout, userSignup } from '../controllers/userController.js'

const router=express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()+".jpg"
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage })




  router.get('/',(req,res)=>{
    res.json('its home')
  })

  router.post('/signup',userSignup)
  router.post('/login',userLogin)
  router.get('/logout',userLogout)





  router.get('/check-auth',checkUserLoggedIn)













export default router