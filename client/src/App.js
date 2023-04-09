import "./App.css";
import UserSignup from "./component/UserSignup/UserSignup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserLogin from "./component/UserLogin/UserLogin";
import UserHome from "./component/UserHome/UserHome";
import AdminLogin from "./component/AdminLogin/AdminLogin";
import AdminHome from "./component/AdminHome/AdminHome";
import CreateUser from "./component/CreateUser/CreateUser";
import EditUser from "./component/EditUser/EditUser";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, admin,refresh } = useSelector((state) => {
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

      let { data: adminData } = await axios.get("/admin/check-auth");
      dispatch({ type: "admin", payload: { login: adminData.loggedIn } });
    })();
  }, [refresh]);

  console.log(user);

  return (
    <Router>
      <div className="App">

        {
          user.login === false && (
            
            <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/" element={<Navigate to={'/login'}  replace={true} />}></Route>
          </Routes>
          )
        }
       

        {user.login === true && (
          <Routes>
            <Route
              path="/login"
              element={<Navigate to="/" replace={true} />}
            ></Route>
            <Route
              path="/signup"
              element={<Navigate to="/" replace={true} />}
            ></Route>
            <Route path="/" element={<UserHome />}></Route>
          </Routes>
        )}


{
        
        admin.login === false &&

            <Routes>

                 <Route path="/admin/login" element={<AdminLogin />}></Route>
                 <Route path="/admin/*" element={ <Navigate to="/admin/login" replace={true} />}></Route>
              
            </Routes>

        
        }

        {
          admin.login === true &&

          <Routes>

            
          <Route path="/admin/" element={<AdminHome />}></Route>
          <Route path="/admin/create-user" element={<CreateUser />}></Route>
          <Route path="/admin/edit-user/:id" element={<EditUser />}></Route>
          <Route path="/admin/*" element={ <Navigate to="/admin/" replace={true} />}></Route>


          </Routes>

        }

      </div>
    </Router>
  );
}

export default App;
