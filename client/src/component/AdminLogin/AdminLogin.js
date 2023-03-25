import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'
import './AdminLogin.css'
import logo from '../../images/logo.png'

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const dispatch=useDispatch()

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
          let { data } = await axios.post("/admin/login", {
            email,
            password,
          });
          if (!data.error) {
            dispatch({type:"refresh"})
            
          } else {
            setErrMessage(data.message);
          }
        }
      }

  return (
  <div className='body-admin-login'>

    <div className="login-card-container">
        <div className="login-card">
            <div className="login-card-logo">
               <img src={logo} alt="logo" />
            </div>
            <div className="login-card-header">
                <h1>Sign In Admin</h1>
                <div>Please login to see admin side</div>
            </div>
            <form onSubmit={handleSubmit} className="login-card-form">
                <div className="form-item">
                 
                    
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email" id="emailForm" 
                    autofocus required />
                </div>
                <div className="form-item">

                
                    
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter Password" id="passwordForm"
                     required />
                </div>

                <div className="form-item">

                <h6 style={{color:'red'}}> {errMessage && errMessage}</h6>
               
                </div>


                
              
                <button type="submit" disabled={validationErr()}>Sign In</button>
            </form>
           
        </div>
        <div className="login-card-social">
            <div>Other Sign-In Options</div>
            <div className="login-card-social-btns">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook"
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
  
  
  </div>
  )
}

export default AdminLogin
