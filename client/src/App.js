
import './App.css';
import UserSignup from './component/UserSignup/UserSignup';
import { BrowserRouter as Router , Routes,Route,Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';





function App() {

  axios.defaults.baseURL = "http://localhost:3333/";
  axios.defaults.withCredentials = true;

  const { user,admin, refresh } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/check-auth");
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });

      let { data:adminData } = await axios.get("/admin/check-auth");
      dispatch({ type: "admin", payload: { login: adminData.loggedIn } })

    })();
  }, [refresh]);
  console.log(user);

  return (
    <div className="App">
  
  

      

    </div>
  );
}

export default App;
