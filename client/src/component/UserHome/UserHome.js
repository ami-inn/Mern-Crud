import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './UserHome.css'
import EditProfileModal from '../../modal/EditProfilePic';

function UserHome() {

    
   const dispatch=useDispatch()
   
   async function logout(){
    if(window.confirm('Are you sure you want to logout')){
        await axios.get('/logout')
        dispatch({type:'refresh'})
    }
   }

   const user= useSelector((state) => {
    return state.user;
  });

  const [open, setOpen]=useState(false)
  const baseImgUrl="http://localhost:5000/uploads/"




  return (

    <div className='body'>
     <div className="card">

<div className="lines"></div>
<div className="imgBx">
    <img src={baseImgUrl+user.details.profile} alt="no img" />
</div>

<div className="content">
    <div className="details">
        <h2>{user.details.name} <br></br><span>{user.details.proffession} </span></h2>
        <div className="data">
            <p>{user.details.about}</p>
         
        </div>
        <div className="actionBtn">
            <button onClick={()=>setOpen(true)}>Edit</button>
            <button onClick={logout}>Logout</button>
        </div>
    </div>
</div>

     </div>

     <EditProfileModal open={open} id={user.details._id} setOpen={setOpen}/>

    </div>
   
   

  )
}

export default UserHome
