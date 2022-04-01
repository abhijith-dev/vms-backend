const errorGenarator = require("../utils/errorGenarator")
const {vehicleModel, fuelModel} = require('../model')
const fuelLimits = require('../utils/fuelLimits')
const fuelAmount = require('../utils/fuelAmount')
module.exports ={
    add: async(req,res)=>{
      try {
        let {fuel,v_id,cat} = req.body
        let vehicleQuery = {_id:v_id}
        let vehicle = await vehicleModel.findOne(vehicleQuery)
        let total = parseInt(vehicle.fuel)+parseInt(fuel)
        let maxlimit = fuelLimits(vehicle.v_type)
        if(total>maxlimit){
            return errorGenarator(1026,res)
        }
        let amount = fuelAmount(fuel,cat)
        await vehicleModel.updateOne(vehicleQuery,{fuel:total})
        let fuelObject = await fuelModel({
            f_type:cat,
            used:fuel,
            amount:amount,
            v_id:v_id
        })
        await fuelObject.save()
        return res.status(200).send()
      } catch (error) {
          return errorGenarator(5000,res)
      }
    },

    getAll: async(req,res)=>{
        try {
           let fuels = await fuelModel.find().populate('v_id')
           res.status(200).send(fuels)
        } catch (error) {
            return errorGenarator(5000,res)
        }
    }
}