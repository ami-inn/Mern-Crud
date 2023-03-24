import React, { useState } from 'react'
import loginImg from '../../images/signin-image.jpg'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';


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
          alert('sucess')
        } else {
          setErrMessage(data.message);
        }
      }
    }
  


  return (
    <>

    <div className="main">

    <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src={loginImg} alt="login" /></figure>
                        <Link to='/signup' class="signup-image-link">Create an account</Link>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Login</h2>
                        <form onSubmit={handleSubmit} class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                 <label className='Error-Message' htmlFor="form2Example27">
                                {errMessage && errMessage}
                                 </label>
                           </div>
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit"  disabled={validationErr()} name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                        <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
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
