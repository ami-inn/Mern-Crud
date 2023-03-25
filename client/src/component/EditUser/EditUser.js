import React, { useEffect, useState } from "react";


import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../AdminLogin/AdminLogin.css";
import logo from '../../images/logo.png'

function EditUser() {
    const [name, setName] = useState("");
    const [proffession, setProffession] = useState("");
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [errMessage, setErrMessage]=useState(null)
    const navigate= useNavigate()
    const {id}=useParams()
    function validationErr() {
      if (
        email.replaceAll(" ", "") === "" ||
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
        let {data}=await axios.post("/admin/edit-user", {
          name, email, about, proffession,id
        });
        if(!data.error){
            return navigate("/admin/")
        }else{
          setErrMessage(data.message)
        }
      }
    }
    useEffect(()=>{
      (async function(){ //auto allocate cheyyan
  
          console.log(id)
          let {data}=await axios.get("/admin/user/"+id);
          
          
          setName(data.name)
          setEmail(data.email)
          setProffession(data.proffession)
          setAbout(data.about)
      })()
  
    },[])



  return (
    <div className='body-admin-login'>

<div className="login-card-container">
        <div className="login-card">
          <div className="login-card-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-card-header">
            <h1>Edit User</h1>
            <div>updating user</div>
          </div>
          <form onSubmit={handleSubmit} className="login-card-form">

         

            <div className="form-item">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Name"
                id="passwordForm"
                required
              />
            </div>

            <div className="form-item">
              <input
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
                type="text"
                placeholder="About you"
                id="passwordForm"
                required
              />
            </div>

            <div className="form-item">
              <input
                value={proffession}
                onChange={(e) => {
                  setProffession(e.target.value);
                }}
                type="text"
                placeholder="Enter Proffession"
                id="passwordForm"
                required
              />
            </div>
            

            <div className="form-item">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter Email"
                id="emailForm"
                autofocus
                required
              />
            </div>
            {/* <div className="form-item">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter Password"
                id="passwordForm"
                required
              />
            </div> */}

        

            <div className="form-item">
              <h6 style={{ color: "red" }}> {errMessage && errMessage}</h6>
            </div>

            <button type="submit" disabled={validationErr()}>
              update
            </button>
          </form>
        </div>
        <div className="login-card-social">
          <div>Other Sign-In Options</div>
          <div className="login-card-social-btns">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-facebook"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-google"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
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

export default EditUser
