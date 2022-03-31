const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:".env"})
const {PORT} = require('./config/variables')
const db = require('./config/db')
const seeder = require('./services/seederServices')
const log =console.log
const {
   userRouter, adminRouter, vehicleRouter
} = require('./routes')

app.use(cors())
app.use(express.json())

app.use('/users',userRouter)
app.use('/admin',adminRouter)
app.use('/vehicles',vehicleRouter)

app.listen(PORT,async(err)=>{
   if(!err){
      log(`server is up :${PORT}`) 
      //databse
      await db
      .init()
      //seeder
      await seeder
      .init()
   }
   else{
       log(`Opps! server is down :${PORT}`)
       db
       .terminate()
   }
})
