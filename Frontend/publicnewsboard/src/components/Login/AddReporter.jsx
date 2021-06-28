import React from "react";
import Data from '../../State.json'
import { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { RegisterService } from "../Service/RegisterService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SweetAlert from 'sweetalert2-react';
const AddReporter = () => {
  const history = useHistory();
  const [FormData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    confirmPassword: "",
    State_:""
  });
  const [dialogue,setDialogue]=useState("")
  function handleInputChange({ target }) {
    console.log(target.value);
    const { name, value } = target;
    setFormData({ ...FormData, [name]: value});
  }

 function handleChange({target}) {
  
  const {name,value}=target
  console.log(name,value)
  ///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  var reg = /^[a-zA-Z0-9#?!@$%^&*-]*$/;
  //var regrex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var test = reg.test(value);
  if (test) {
    console.log("pass")
     setFormData({...FormData,[name]:value})
  }else{
    toast.warn("pass should be in small and capital letters")
  }        
}
function handleName({target})
    
      { 
        const {name,value}=target
        console.log(name,value)
      var letters = /^[a-zA-Z]*$/;
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
    console.log(FormData)
    if (userName.length === 0) {
      toast.warning("please enter Name");
    } else if (password.length === 0) {
      toast.warning("please enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("please confirm password");
    } else if (password !== confirmPassword) {
      toast.warning("password does not match");
    }  else if (email.length === 0) {
      toast.warning("please enter email name");
    } else if (phone.length === 0) {
      toast.warning("please enter phone name");
    }else if (city.length === 0) {
      toast.warning("please enter City Name");
    }else if (State_.length===0) {
      toast.warning("Please choose state");
    } 
    else {
      console.log(FormData);
      const variables = {
        userName: userName[0].toUpperCase()+userName.slice(1),
        email: email,
        password: password,
        city: city[0].toUpperCase()+city.slice(1),
        phone: phone,
        confirmPassword: confirmPassword,
        State_:State_
      
    }
    console.log(variables)
      RegisterService(variables).then(res => {
        if (res) {
          console.log(res)
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
  const { userName, email, password, phone, city, confirmPassword,State_ } = FormData;
  return (
    <div className="container col-md-4 col-lg-4">
      <div style={{ textAlign: "center" }}>
        <img style={{height:"150px",borderRadius:"50%"}} src={require("../../Asset/reporterAvatar.jpg").default} alt="" />
        <span className="text-primary h2">
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </span>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Reporter Name</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Reporter Name"
            name="userName"
            value={userName}
            onChange={handleName}
          />
        </div>
        {(userName==="") && <small id="passwordHelpInline" className="text-muted">
             Reporter Name must be letters only *
            </small>}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              name="email"
              value={email}
              pattern="\S+@\S+\.\S+"
              onChange={handleInputChange}
              placeholder="anystring@anystring.anystring"
            />
          </div>
          <div className="form-group col-md-12">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              id="inputPassword4"
              placeholder="(xxxxxxxxxx)"
              name="phone"
              pattern="^\d{10}$"
              value={phone}
              onChange={handleInputChange}
              
            />
              {(phone.length!==10)&& <small id="passwordHelpInline" className="text-muted">
              Must be 10 digits and no spaces.
            </small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-12">
            <label>State</label>
            <select
              id="inputState"
              className="form-control"
              placeholder="state"
              value={State_} name="State_" onChange={handleInputChange}
            >
              <option defaultValue>Choose...</option>
              {Data.map((post) => {
                return <option key={post.key}>{post.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group col-md-12">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              name="city"
              value={city}
              placeholder="City"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2 mb-3">
          Sign up
        </button>

        <ToastContainer />
      </form>
      <SweetAlert
        show={dialogue}
        title="Register Reporter"
        text="Successfully Created Account"
        onConfirm={()=>{setDialogue(false)}}
      />
    </div>
  );
};

export default AddReporter;
