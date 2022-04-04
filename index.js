const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path:".env"})
const {PORT} = require('./config/variables')
const db = require('./config/db')
const seeder = require('./services/seederServices')
const cron = require('./services/cronServices')
const log =console.log
const {
   userRouter, adminRouter, vehicleRouter, driverRouter, mappingRouter, 
   fuelRouter, reportRouter,bookingRouter, analyticRouter, trackingRouter
} = require('./routes')

app.use(cors())
app.use(express.json())
app.use('/static', express.static('public'))

app.use('/users',userRouter)
app.use('/admin',adminRouter)
app.use('/vehicles',vehicleRouter)
app.use('/drivers',driverRouter)
app.use('/mapping',mappingRouter)
app.use('/fuels',fuelRouter)
app.use('/report',reportRouter)
app.use('/booking',bookingRouter)
app.use('/analytics',analyticRouter)
app.use('/tracking',trackingRouter)

app.listen(PORT,async(err)=>{
   if(!err){
      log(`server is up :${PORT}`) 
      //databse
      await db
      .init()
      //seeder
      await seeder
      .init()
      //cron-job
      await cron
      .init()
   }
   else{
       log(`Opps! server is down :${PORT}`)
       db
       .terminate()
   }
})
