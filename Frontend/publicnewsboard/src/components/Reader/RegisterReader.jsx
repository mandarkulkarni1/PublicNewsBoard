import React from "react"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterReaderService } from "../Service/RegisterReaderService";
import SweetAlert from 'sweetalert2-react';

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

  const [dialogue,setDialogue]=useState("")
  function handleInputChange({ target }) {
    const { name, value } = target;
    setFormData({ ...FormData, [name]: value});
  }

  function handleInputChange({ target }) {
    console.log(target.value);
    const { name, value } = target;
    setFormData({ ...FormData, [name]: value });
  }

  function handleName({target})
    
      { 
        const {name,value}=target
      var letters = /^[a-zA-Z\s]*$/;
      if(value.match(letters))
      {
        setFormData({...FormData,[name]:value})
        return true;
      }
      else
      {
      toast.warn("Please enter letters only in Reporter name ")
       return false;
      }
      }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (userName.length === 0) {
      toast.warning("Please enter Name");
    }  
      else if (email.length === 0) {
      toast.warning("Please enter email name");
    }  else if (city.length === 0) {
      toast.warning("Please enter city name");
    } 
      else if (password.length === 0) {
      toast.warning("Please enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("Please confirm password");
    } else if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
    } else {
      console.log(FormData);
      RegisterReaderService(FormData).then(res => {
        if (res) {
          if(res.status==="error"){
             toast.error(res.error)
           }else{
               // toast.success("Account Successfully created")
               setDialogue(true)
                history.push("/login");
              
           }
         // console.log(res.status,res.error);  
       } else {
         toast.error(res["error"]);
       }
     });
    }
  }
  const { userName, email, password, confirmPassword,city } = FormData;
  return (
    <div className="container col-md-4 col-lg-4 mx-auto border border-info p-4 rounded shadow-lg" style={{ margin: "5px" }}>
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
            onChange={handleName}
          />
        </div>
        {(userName==="") && <small id="passwordHelpInline" className="text-muted">
             Reader Name must be contain letters only *
            </small>}

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
           {(password==="" || password.length<6) && <small id="passwordHelpInline" className="text-muted">
              Must be 6-20  small characters long.
            </small>}
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
             {(password !== confirmPassword) && <small id="passwordHelpInline" className="text-muted">
              Passwords do not match
            </small>}
          </div>
        </div>
      
        <div className="form-group">
          <label>City Name</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="City Name"
            name="city"
            value={city}
            onChange={handleName}
          />
          {(city==="") && <small id="passwordHelpInline" className="text-muted">
             City name must contains letters only *
            </small>}
        </div>

        <button type="submit" className="btn btn-primary mt-2 mb-3">
          Sign up
        </button>
        <ToastContainer />
      </form>
      <SweetAlert
        show={dialogue}
        title="Register readered"
        text="Reader account created successfully"
        onConfirm={()=>{setDialogue(false)}}
      />
    </div>
  );
};

export default RegisterReader;
