const express=require('express')
const router=express.Router()
const dbData=require('../../databaseCredential')
const utils=require('./../../utils')
const crypto=require('crypto-js')
const db=require('../../models')
const secretKey=require('../../secretKey')
const Admin=db.Admin
const jwt=require('jsonwebtoken')

router.post('/signup', (request, response) => {
    //  const {password}=request.body.password
    //  const encryptedPassword = crypto.SHA256(password)
    const admin = {
        userName: request.body.userName || "default",
        password: crypto.SHA256(request.body.password).toString() || "default",
        email: request.body.email
    
      };
   console.log(admin)
    // const encryptedPassword = crypto.SHA256(password)
    
    Admin.create(admin)
    .then(data=>{
        response.send(data)
    })
      .catch(err=>{
          response.status(500).send({
              message:err.message || "some error occured"
          })
      })
  })


  router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `select adminId, userName, email from admins where email = '${email}' and password = '${encryptedPassword}'`
    console.log(statement)
    dbData.query(statement,(err,data)=>{
        res.send(utils.createResult(err,data))
    })
 })


 
module.exports=router
