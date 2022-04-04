const { vehicleModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")
const vehicleAmount = require('../utils/vehicleAmount.js')
const vehicleImages = require('../utils/vehicleImages')
const {bookingModel} = require('../model')

module.exports={
    initiate: async(req,res)=>{
        try {
          let {from,to,p_count,g_count} = req.body 
          let vehicles = await vehicleModel.find({drivers:{$ne:null},status:'Idel'}).populate('drivers')
          let vehicle = vehicles
          .filter(veh=>{
              if(veh.drivers.location === from && veh.p_range>=p_count && veh.g_range === g_count)
                return veh
          })
          .map(veh=>{
             var v_amount = vehicleAmount(from,to,p_count,g_count,veh.v_cost)
             var v_image = vehicleImages(veh.v_type)
             return {...veh._doc,v_amount,to,v_image}
          }) 
          return res.status(200).send(vehicle)
        } catch (error) {
           return errorGenarator(5000,res)
        }
    },
    
    selection: async(req,res)=>{
        try {
            const {from,to,amount,passanger,goods,postpayment,vehicle_id,driver_id} = req.body
            let date = new Date()
            let transaction_id = postpayment?null:'cash'
            let booking = await bookingModel({
               user:req.user, 
               from,
               to,
               amount,
               passanger,
               goods,
               vehicle:vehicle_id,
               driver:driver_id,
               transaction:transaction_id,
               date:`${date.toDateString()}-${date.toTimeString()}`
            })
        let book = await booking.save()
        await vehicleModel.updateOne({_id:vehicle_id},{status:'On Raid'})
        return res.status(202).send({_id:book._id})
        } catch (error) {
           return errorGenarator(5000,res)
        }
    },

    getAll: async(req,res)=>{
        try {
            let booking = await bookingModel.find().populate('driver').populate('vehicle')
            return res.status(200).send(booking)
        } catch (error) {
            return errorGenarator(5000,res) 
        }
    },

    payment: async(req,res)=>{
        try {
           const {vehicle_id,id,transaction,amount} = req.body
           await bookingModel.updateOne({_id:id,vehicle:vehicle_id,user:req.user},{transaction:transaction,amount:amount}) 
           await vehicleModel.updateOne({_id:vehicle_id},{status:'Idel',$inc: { fuel: -3 }})
           res.status(202).send()
        } catch (error) {
            return errorGenarator(5000,res) 
        }
    },

    cancel: async(req,res)=>{
        try {
            const {vehicle_id,id,transaction,amount} = req.body
            await bookingModel.updateOne({_id:id,vehicle:vehicle_id,user:req.user},{transaction:transaction,amount:amount}) 
            await vehicleModel.updateOne({_id:vehicle_id},{status:'Idel'})
            res.status(202).send() 
         } catch (error) {
             return errorGenarator(5000,res) 
         }
    }
}