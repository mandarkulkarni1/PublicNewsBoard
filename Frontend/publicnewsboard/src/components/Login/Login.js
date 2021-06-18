import React from 'react'
import {useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import LoginContext from './LoginContext'
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

const Login=({handleChange})=>{
     
       const {setLogin}=useContext(LoginContext);
       
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
            
            console.log(FormData)
            LoginService(FormData)
              .then(res=>{
                if(res['status']==='success'){
                    setLogin(true)
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

    

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid >
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                 <form  onSubmit={handleFormSubmit}>
                <TextField label='Email' placeholder='Enter username' name="email" value={email} onChange={handleInputChange} fullWidth />
                <TextField label='Password' placeholder='Enter password' type='password' name="password" value={password} onChange={handleInputChange} fullWidth />
                <br></br>
                <br></br>
                <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label" fullWidth >Role</InputLabel>
                <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                       fullWidth value={role} name="role" onChange={handleInputChange} label="Role"
                >
                    <br></br>
                 <MenuItem value="">
                      <em>None</em>
                 </MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'Reporter'}>Reporter</MenuItem>
                  <MenuItem value={'User'}>User</MenuItem>
                 </Select>
                </FormControl>
                 <br></br>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                 </form>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
                <ToastContainer/>
            </Paper>
        </Grid>
    )
}

export default Login