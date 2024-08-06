import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {


  const [cookies, setCookie] = useCookies(['username']);

  const history = useNavigate();
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  let name, value;

  const handleChange = (e) => {
    value = e.target.value;
    name = e.target.name;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const PostData = (e) => {
    e.preventDefault();

    const { username, password } = user;

  
  // axios.get(
  //   "http://127.0.0.1:8000/"
  // )
  // .then((res)=>{
  //   setUk(res.data);
  //   console.log(res.data)
  //   toast.dark(`You have been successfully login ! ${res.data}`);
  // })
  // .catch((err)=>{
  //   console.log(err.response);
  // })


  axios.post(
      "http://127.0.0.1:8000/api/login/",
      `username=${username}&password=${password}`
    )
    .then((res) => {
      console.log(res);
      
      if (res.request.status === 200) {
        // toast.success("You have been successfully login ! ");
        setCookie('username', username, { path: '/' });
        toast.success("welcome to shorthills.ai !!");
        history('/question', { state: { user_name: username} });
      }
    })
    .catch((err) => {
      console.log(err.response);
      if (err.request.status === 401) {
        toast.error("Invalid Credentials");
      }
    });
  };

  return (
    <>
      <div style={{ height: "90px" }}></div>
      {/* {uk} */}
      <body className="login-container">
        <div id="login-div" className="">
          <div className="fields ">
            <span style={{ width: "100%" }} className="fields-span">
              Welcome back!
            </span>
            <span
              style={{
                display: "block",
                width: "100%",
                marginBottom: 1 + "rem",
              }}
            >
              Sign in and continue your journey.
            </span>
          </div>
          <div className="md:max-w-sm md:mx-auto login-box">
            <span style={{ display: "block" }} className="fields-span">
              Login
            </span>
            <form className="login-form" onSubmit={handleSubmit} method="POST">
              <div className="field md:w-full">
                <label for="email" className=" label">
                  Username or Email
                </label>
                <div className="inputt">
                  <PersonIcon />
                  <input
                    className="inputt-area"
                    type="email"
                    name="username"
                    id="email"
                    placeholder="Username or Email"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field md:w-full">
                <label for="password" className="label">
                  Password
                </label>
                <div
                  className="inputt"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LockIcon />
                  <input
                    className="inputt-area"
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <IconButton
                    style={{ height: "5px" }}
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
            </form>

            {/* <p style={{ cursor: "pointer", textAlign: "right" }}>
              <NavLink to="/forgotpassword" className="links">
                Forgot password?
              </NavLink>
            </p> */}

              <div className="field" style={{
                textAlign: "center"}}>
                <button
                  style={{ cursor: "pointer", textAlign: "center" }}
                  value="login"
                  onClick={PostData}
                  className="field form-button mr-20"
                >
                  Login
                </button>
              </div>
                
            <p style={{ cursor: "pointer", textAlign: "center" }}>
              Don't Have An Account ?{" "}
              <NavLink to="/signup" className="links">
                SignUp <i class="fa fa-arrow-right"></i>
              </NavLink>
            </p>

            <br />
          </div>
        </div>
      </body>
      <ToastContainer autoClose={5000}/>
    </>
  );
}

export default Login;