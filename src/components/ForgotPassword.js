import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ForgotPassword() {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const [valuesc, setValuesc] = useState({
    showPasswordc: false,
  });

  const handleClickShowPasswordc = () => {
    setValuesc({ ...valuesc, showPasswordc: !valuesc.showPasswordc });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  

  const [user, setUser] = useState({
    email: "",
    password: "",
    password2:"",
  });

  let name, value;

  const handleChange = (e) => {
    console.log(e);
    value = e.target.value;
    name = e.target.name;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("forgot p working");
  };
  return (
    <div>
      <div style={{ height: "90px" }}></div>
      <body className="login-container">
        <div id="login-div" className="">
          <div className="fields ">
            <span style={{ width: "100%" }} className="fields-span">
              Reset Password
            </span>
            <span
              style={{
                display: "block",
                width: "100%",
                marginBottom: 1 + "rem",
              }}
            >
              Create a new password to login your account.
            </span>
          </div>
          <div className="  md:max-w-sm md:mx-auto login-box">
            <form className="login-form" onSubmit={handleSubmit} method="POST">
              <div className="field md:w-full">
                <label for="email" className=" label">
                  Username or Email
                </label>
                <div className="inputt">
                  <PersonIcon />
                  <input
                    className="inputt-area"
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Username or Email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field md:w-full">
                <label for="password" className="label">
                  Enter New Password
                </label>
                <div
                  className="inputt"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LockIcon />
                  <input
                    className="inputt-area"
                    required
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
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>

              <div className="field md:w-full">
                <label for="password" className="label">
                  Re-Enter New Password 
                </label>
                <div
                  className="inputt"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LockIcon />
                  <input
                    className="inputt-area"
                    required
                    type={valuesc.showPasswordc ? "text" : "password"}
                    name="password2"
                    id="password"
                    placeholder="Password"
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
              </div>

              <div className="field" style={{
                textAlign: "center"}}>
                <button
                  style={{ cursor: "pointer", textAlign: "center" }}
                  value="resetpassword"
                  className="field form-button mr-20"
                >
                  Reset Password
                </button>
              </div>

            </form>

        <br/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <NavLink to="/login" className="links">
            <p style={{ cursor: "pointer" , textAlign:"center" }}><PersonIcon />login</p>
        </NavLink>
        <NavLink to="/signup" className="links">
            <p style={{ cursor: "pointer" , textAlign:"center" }}><PersonAddIcon />create new account</p>
        </NavLink>
        </div>

          </div>
        </div>
      </body>
    </div>
  );
}

export default ForgotPassword;