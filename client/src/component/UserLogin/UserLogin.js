import React, { useState } from 'react'
import loginImg from '../../images/signin-image.jpg'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import '../login-signup-css/Style.css'
import {BsFillEnvelopeFill,BsFileLock2Fill,BsGoogle,BsTwitter,BsFacebook } from "react-icons/bs";


function UserLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const dispatch = useDispatch();
    function validationErr() {
      if (
        email.replaceAll(" ", "") === "" ||
        password.replaceAll(" ", "") === ""
      ) {
        return true;
      }
      return false;
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      if (!validationErr()) {
        let { data } = await axios.post("/login", {
          email,
          password,
        });
        if (!data.error) {
          dispatch({ type: "refresh" });
         
        } else {
          setErrMessage(data.message);
        }
      }
    }
  


  return (
    <>

    <div className="main">

    <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={loginImg} alt="login" /></figure>
                        <Link to='/signup' className="signup-image-link">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form onSubmit={handleSubmit} className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_name"><BsFillEnvelopeFill/></label>
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><BsFileLock2Fill/></label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                  
                  <p className='Error-Message'> {errMessage && errMessage}</p>

                    </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit"  disabled={validationErr()} name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><BsFacebook/></a></li>
                                <li><a href="#"><BsTwitter/></a></li>
                                <li><a href="#"><BsGoogle/></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>

    </>
  )
}

export default UserLogin
