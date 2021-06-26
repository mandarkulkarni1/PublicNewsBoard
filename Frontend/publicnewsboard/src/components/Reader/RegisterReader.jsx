import React from "react"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterReaderService } from "../Service/RegisterReaderService";

const RegisterReader = () => {
  const history = useHistory();
  const [FormData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    confirmPassword: "",
  });

  function handleInputChange({ target }) {
    console.log(target.value);
    const { name, value } = target;
    setFormData({ ...FormData, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (userName.length === 0) {
      toast.warning("please enter Name");
    }  
      else if (email.length === 0) {
      toast.warning("please enter email name");
    } 
      else if (password.length === 0) {
      toast.warning("please enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("please confirm password");
    } else if (password !== confirmPassword) {
      toast.warning("password does match");
    } else {
      console.log(FormData);
      RegisterReaderService(FormData).then(res => {
        if (res) {
          //  if(res.status==="error"){
          //    toast.error(res.error)
          //  }
          // console.log(res.status,res.error);
         // console.log(res)
          history.push("/login");
        } else {
          toast.error(res["error"]);
        }
      });
    }
  }
  const { userName, email, password, confirmPassword } = FormData;
  return (
    <div className="container col-md-4 col-lg-4">
      <div style={{ textAlign: "center" }}>
        <img style={{height:"150px",borderRadius:"50%"}} src={require("../../Asset/Reader.png").default} alt="" />
        
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Reader Name</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Reader Name"
            name="userName"
            value={userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            {/* <small id="passwordHelpInline" className="text-muted">
              Must be 8-20 characters long.
            </small> */}
          </div>
          <div className="form-group col-md-12">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
         
        </div>

        <button type="submit" className="btn btn-primary mt-2 mb-3">
          Sign up
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default RegisterReader;
