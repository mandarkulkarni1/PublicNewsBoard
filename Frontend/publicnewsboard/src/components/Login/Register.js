

import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { RegisterService } from '../Service/RegisterService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
const Register = () => {
  
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
    if (userName.length === 0) {
     toast.warning('please enter Name')
   } else if (city.length === 0) {
    toast.warning('please enter City Name')
   } else if (email.length === 0) {
    toast.warning('please enter email name')
   } else if (phone.length === 0) {
    toast.warning('please enter phone name')
   } else if (password.length === 0) {
    toast.warning('please enter password')
   } else if (confirmPassword.length === 0) {
    toast.warning('please confirm password')
   } else if (password !== confirmPassword) {
    toast.warning('password does match')
   }
    else{
        console.log(FormData)
        RegisterService(FormData)
        
          .then(res=>{
              if(res['status']==='success'){
                toast.success("Successfully created Account")
                console.log(res)
                history.push('/login')
              }else{
                  toast.error(res['error'])
              }
             
   
      })
   }
  }
  const {userName,email,password,phone,city,confirmPassword}=FormData
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
             <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill  form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleFormSubmit}>
                    <TextField fullWidth label='username' name="userName"  placeholder="Enter your name" value={userName} onChange={handleInputChange} />
                    <TextField fullWidth label='Email' placeholder="Enter your email" name="email" value={email}  onChange={handleInputChange}/>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" name="phone" value={phone}  onChange={handleInputChange}/>
                    <TextField fullWidth label='Place' placeholder="Enter your native place" name="city" value={city}  onChange={handleInputChange}/>
                    <TextField fullWidth label='Password' placeholder="Enter your password" name="password" value={password}  onChange={handleInputChange}/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" value={confirmPassword} name="confirmPassword" onChange={handleInputChange}/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions"
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                    {/* <ToastContainer/> */}
                </form>
                
            </Paper>
        </Grid>
    )
}

export default Register;
