import React, { useState } from "react";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const history = useNavigate();
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // const [valuesc, setValuesc] = useState({
  //   showPasswordc: false,
  // });
  // const handleClickShowPasswordc = () => {
  //   setValuesc({ ...valuesc, showPasswordc: !valuesc.showPasswordc });
  // };

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
//   const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password} = user;

    axios
      .post(
        "http://127.0.0.1:8000/api/register/",
        `username=${username}&password=${password}`
      )
      .then((res) => {
        if (res.request.status === 201) {
          toast.success("Your account has been registered,proceed to signin");
          // history("/login");
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Invalid Credentials , All fields are mandatory or Already Registered User!!");
      });
  };

  return (
    <>
      <div style={{ height: "90px" }}></div>
      <div className="signup-container">
        <div id="login-div" className="">
          <div className="fields "></div>
          <div className="md:max-w-sm md:mx-auto signup-box">
            <span style={{ display: "block" }} className="fields-span">
              SignUp
            </span>
            <span
              style={{
                display: "block",
                width: "100%",
                marginBottom: 2 + "rem",
              }}
            >
              <h6> Welcome To shorthills</h6>
            </span>
            <form method="POST" className="login-form">
              <div className="field">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <div className="inputt">
                  <PersonIcon />
                  <input
      
                    type="text"
                    id="name"
                    className="inputt-area"
                    placeholder="Name"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <div className="field">
                <label className="label" htmlFor="email">
                  E-Mail Address
                </label>
                <div className="inputt">
                  <MailIcon />
                  <input
                    type="email"
                    id="email"
                    className="inputt-area"
                    placeholder="Email ID"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              
              <div className="field">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="inputt">
                  <LockIcon />
                  <input
                    type={values.showPassword ? "text" : "password"}
                    id="password"
                    className="inputt-area"
                    placeholder="Password"
                    name="password"
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


              {/* <div className="field">
                <label className="label" htmlFor="cpassword">
                  Confirm Password
                </label>
                <div className="inputt">
                  <LockIcon />
                  <input
                    type={valuesc.showPasswordc ? "text" : "password"}
                    id="cpassword"
                    className="inputt-area"
                    placeholder="Confirm your password"
                    name="password2"
                    value={user.password2}
                    onChange={handleChange}
                  />
                  <IconButton
                    style={{ height: "5px" }}
                    onClick={handleClickShowPasswordc}
                  >
                    {valuesc.showPasswordc ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div> */}
            </form>

            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="field">
                <button
                  style={{ cursor: "pointer", textAlign: "center" }}
                  value="register"
                  onClick={PostData}
                  className="form-button mr-20"
                >
                  Register
                </button>
              </div>

              <div>
                <p style={{ cursor: "pointer", textAlign: "center" }}>
                  Already Have Account ?{" "}
                  <NavLink to="/login" className="links">
                    Log In
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000}/>
    </>
  );
};

export default SignUp;