const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
const db=require('./models')
const routeReporter=require('./routes/reporters/reporters')
const secretKey =require('./secretKey')
const utils=require('./utils')
const jwt=require('jsonwebtoken')
const routeAdmin=require('./routes/admin/admin')
app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


db.sequelize.sync();




function authorized(request,response,next)
{
    // 
    if(request.url=='/reporters/signin'|| request.url=='/reporters/signup'
       || request.url=='/admin/signin' || request.url=='/admin/signup')
    {
        next()
    }
    else{
        const token=request.headers['token']
        console.log(token)
        if(!token)
        {
            response.status(401)
            response.send(utils.createResult('token is missing'))
            
        }
        else {
            try{
                const data=jwt.verify(token,secretKey.secret)
                // console.log(data.id)
                request.reporterId=data.id
                // console.log(userId,data.id)
                next()
            }
            catch(ex)
            {
                response.status(401)
                response.send(utils.createResult('invalid token'))
            }
        }
    }
}
app.use(authorized)
app.use('/reporters',routeReporter)
app.use('/admin',routeAdmin)
app.listen('8080',()=>{
    console.log('Server is running at port number 8080')
})