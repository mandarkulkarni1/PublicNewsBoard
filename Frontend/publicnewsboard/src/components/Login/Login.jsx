import React from 'react'
import {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { LoginService } from '../Service/LoginService'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, formatMs } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import AddReporter from './AddReporter'
import LoginContext from '../Login/LoginContext'
const Login = () => {
   
//   const {setLogin}=useContext(LoginContext);
  const{setLogin}=useContext(LoginContext)
  const history=useHistory()
  const[FormData,seFormData]=useState({
   email:"",
   password:"",
   role:""
  })
  const{email,password,role}=FormData
   function handleInputChange({target}){
       const{name,value}=target;
       seFormData({...FormData,[name]:value})
    }

   function handleFormSubmit(e){
   e.preventDefault();
   if (FormData.email.length === 0) {
       toast.warning('please enter email name')
     } else if (password.length === 0) {
       toast.warning('please enter password')
     } else if (role === "") {
       toast.warning('please choose role')
     }else{
       setLogin(true)
       console.log(FormData)
       LoginService(FormData)
         .then(res=>{
           if(res['status']==='success'){
            //    setLogin(true)
               sessionStorage.setItem("user",JSON.stringify(res.data))
             console.log(res)
            
             if(FormData.role==='Admin'){
                 
                 history.push('/admin')

             }else if(FormData.role==='Reporter')
            {
               
               history.push('/reporter')
            }else{
                history.push('/')
            }
           }else{
               console.log(res['error'])
               toast.error(res['error'])
               history.push('/login')
           }
         })
     }
 
  
   //   history.push('/reporter')
  }


  return (
    <div className="container">
      <div className="row">
        <form className="col-md-5 col-lg-5  mx-auto" onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center" }}>
            <img src={require("../../Asset/login2.png").default} alt="" />
            <span className="h6">
              <b style={{ color: "#0ebcc2" }}>Login</b>
            </span>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Select Role</label>
            <select class="form-control" name="role" value={role} onChange={handleInputChange}>
              <option disabled selected>
                Select User
              </option>
              <option value={'User'}>Reader</option>
              <option value={'Reporter'}>Reporter</option>
              <option value={'Admin'}>Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email" name="email" value={email} onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password" name="password" value={password} onChange={handleInputChange}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-primary"
            >
              Sign-in <span>&nbsp;</span>
              <i class="fa fa-sign-in" aria-hidden="true"></i>
            </button>
          </div>
          <div class="form-row mt-2">
            <div class="col">
              <button
                type="submit"
                style={{ width: "100%" }}
                className="btn btn-secondary"
                
              >
                Register User<span>&nbsp;</span>
                <i class="fa fa-user-plus"></i>
              </button>
            </div>
            
            <div class="col mt-2"  >
              <button
                type="submit"
                style={{ width: "100%" }}
                className="btn btn-secondary"
                onClick={()=>{history.push('/addReporter')}}
              >
                Register Reporter <span>&nbsp;</span>
                <i class="fa fa-user-plus"></i>
              </button>
            </div>
          </div>
        </form>

      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
