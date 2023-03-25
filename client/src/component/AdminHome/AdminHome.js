import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const baseImgUrl = "http://localhost:5000/uploads/";

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/admin/users?search=" + search);
      setUsers(data);
    })();
  }, [search, refresh]);
  async function deleteUser(id) {
    if (window.confirm("Are you sure delete this user")) {
      await axios.post("/admin/delete-user", { id });
      setRefresh(!refresh);
    }
  }

  const dispatch = useDispatch();

  async function logout() {
    if (window.confirm("are you sure logout")) {
      await axios.get("/admin/logout");
      dispatch({ type: "refresh" });
    }
  }

  return (
    <div className="body-admin">
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section">Admin</h2>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                <Link to="/admin/create-user">
                  <button class="btn btn-primary">create user</button>
                </Link>

                <button onClick={logout} class="btn btn-primary">
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">


            {/* search */}

            <div className="search-box">

                <div className="search-bar">

                <input type="text" placeholder="search" name="q"  value={search} onChange={(e)=>setSearch(e.target.value)}  />
                <button><BsSearch></BsSearch></button>

                </div>

               

            </div>

              <div class="table-wrap">
                <table class="table">
                  <thead class="thead-primary">
                    <tr>
                      <th>No</th>
                      <th>image</th>
                      <th>name</th>
                      <th>email</th>
                      <th>proffession</th>
                      <th>edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row" class="scope">
                            {index + 1}
                          </th>
                          <td>
                            <div>
                              <img
                                src={baseImgUrl + item.profile}
                                style={{ width: "65px", height: "65px" }}
                                className="rounded-circle"
                              />
                              <div className="ms-3"></div>
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.proffession}</td>
                          <td
                            style={{
                              display: "flex",
                              gap: "15px",
                              justifyContent: "center",
                            }}
                          >
                            <Link to={"/admin/edit-user/" + item._id}>
                              <button class="btn btn-primary">Edit</button>
                            </Link>

                            <button
                              onClick={() => deleteUser(item._id)}
                              class="btn btn-primary"
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminHome;
