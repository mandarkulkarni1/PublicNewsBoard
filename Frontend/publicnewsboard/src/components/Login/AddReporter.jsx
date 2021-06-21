import React from "react";

import {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { RegisterService } from '../Service/RegisterService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const AddReporter = () => {

  const history=useHistory()
  const[FormData,setFormData]=useState({
   userName:"",
   email:"",
   password:"",
   city:"",
   phone:"",
   confirmPassword:""
  })
  
  function handleInputChange({target}){
    console.log(target.value)
    const{name,value}=target;
    setFormData({...FormData,[name]:value})
    }

   function handleFormSubmit(e){
   e.preventDefault();
    if (userName.length == 0) {
     toast.warning('please enter Name')
   } else if (city.length == 0) {
    toast.warning('please enter City Name')
   } else if (email.length == 0) {
    toast.warning('please enter email name')
   } else if (phone.length == 0) {
    toast.warning('please enter phone name')
   } else if (password.length == 0) {
    toast.warning('please enter password')
   } else if (confirmPassword.length == 0) {
    toast.warning('please confirm password')
   } else if (password != confirmPassword) {
    toast.warning('password does match')
   }
    else{
        console.log(FormData)
        RegisterService(FormData)
          .then(res=>{
             
              if(res){
                
                console.log(res)
                history.push('/login')
                
              }else{
                  toast.error(res['error'])
              }
             
   
      })
   }
  }
  const {userName,email,password,phone,city,confirmPassword}=FormData
  return (
    <div className="container col-md-7 col-lg-7">
      <div style={{ textAlign: "center" }}>
        <img src={require("../../Asset/reporter.png").default} alt="" />
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
            placeholder="Reporter Name" name="userName" value={userName} onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password" name="password" value={password} onChange={handleInputChange}
            />
            {/* <small id="passwordHelpInline" className="text-muted">
              Must be 8-20 characters long.
            </small> */}
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email" name="email" value={email} onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              id="inputPassword4"
              
              placeholder="Phone Number" name="phone" value={phone} onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-5">
            <label>State</label>
            <select id="inputState" className="form-control">
              {/* <option defaultValue>Choose...</option>
              {Data.map((post) => {
                return <option key={post.key}>{post.name}</option>;
              })} */}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label>City</label>
            <input type="text" className="form-control" id="inputCity" name="city" value={city} onChange={handleInputChange} />
          </div>
          <div className="form-group col-md-3">
            <label>Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default AddReporter;
