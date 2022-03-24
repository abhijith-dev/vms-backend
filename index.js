const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:".env"})
const {PORT} = require('./config/variables')
const db = require('./config/db')
const log =console.log
const {
   userRouter
} = require('./routes')

app.use(cors())
app.use(express.json())

app.use('/users',userRouter)

app.listen(PORT,(err)=>{
   if(!err){
      log(`server is up :${PORT}`) 
      db
      .init()
   }
   else{
       log(`Opps! server is down :${PORT}`)
       db
       .terminate()
   }
})
