

import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import signupImg from '../../images/signup-image.jpg'
import '../login-signup-css/Style.css'




function UserSignup() {


    
    const [name, setName] = useState("");
    const [proffession, setProffession] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage]=useState(null)
    const dispatch = useDispatch()

    function validationErr() {
        if (
          email.replaceAll(" ", "") === "" ||
          password.replaceAll(" ", "") === "" ||
          about.replaceAll(" ", "") === "" ||
          proffession.replaceAll(" ", "") === "" ||
          name.replaceAll(" ", "") === ""
        ) {
          return true;
        }
        return false;
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
        if (!validationErr()) {
          let {data}=await axios.post("/signup", {
            name, email, password, about, proffession
          });
          if(!data.error){
            dispatch({type:"refresh"})
            alert('success')
          }else{
            setErrMessage(data.message)
          }
        }
      }



  return (

    <>

<div className="main">

      
<section className="signup">
    <div className="container">
        <div className="signup-content">
            <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form onSubmit={handleSubmit}  className="register-form" id="register-form">
                    <div className="form-group">
                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" id="name" placeholder="Your Name"/>
                    </div>
                    <div className="form-group">
                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                        <label for="proffession"><i className="zmdi zmdi-email"></i></label>
                        <input value={proffession} onChange={(e)=>{setProffession(e.target.value)}} type="text" name="proffession" id="proffesion" placeholder="Your Proffession"/>
                    </div>
                    <div className="form-group">
                        <label for="about"><i className="zmdi zmdi-email"></i></label>
                        <input value={about} onChange={(e)=>{setAbout(e.target.value)}} type="text" name="about" id="about" placeholder="About you "/>
                    </div>
                    <div className="form-group">
                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="pass" id="pass" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                    <label classNameName='Error-Message' htmlFor="form2Example27">
                        {errMessage && errMessage}
                    </label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                        <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" disabled={validationErr()} name="signup" id="signup" className="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div className="signup-image">
                <figure><img src={signupImg} alt="" /></figure>
                <Link to='/login' className="signup-image-link">I am already member</Link>
            </div>
        </div>
    </div>
</section>



</div>
    
    </>
   
  )
}

export default UserSignup
