const { driverModel, vehicleModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")

module.exports ={
    create :async(req,res)=>{
       try {
        let v_id = req.body.v_id
        let d_id = req.body.d_id
        let driverQuery ={
            _id :d_id
        }
        let vehicleQuery ={
            _id :v_id
        }
        let driverUpdate ={
            vehicle:v_id
        }
        let vehicleUpdate ={
            drivers:d_id
        }
        let drivers = await driverModel.findOne(driverQuery)
        let vehicles = await vehicleModel.findOne(vehicleQuery)
        if(drivers.vehicle!==null || vehicles.drivers!==null ){
           return errorGenarator(1024,res) 
        }
        await driverModel.updateOne(driverQuery,driverUpdate)
        await vehicleModel.updateOne(vehicleQuery,vehicleUpdate)
        res.status(200).send()
       } catch (error) {
           return errorGenarator(5000,res)
       }
    },

    remove :async(req,res)=>{
        try {
         let v_id = req.body.v_id
         let d_id = req.body.d_id
         let driverQuery ={
             _id :d_id
         }
         let vehicleQuery ={
             _id :v_id
         }
         let driverUpdate ={
             vehicle:null
         }
         let vehicleUpdate ={
             drivers:null
         }
         let drivers = await driverModel.findOne(driverQuery)
         let vehicles = await vehicleModel.findOne(vehicleQuery)
         if(drivers.vehicle===null || vehicles.drivers===null ){
            return errorGenarator(1025,res) 
         }
         await driverModel.updateOne(driverQuery,driverUpdate)
         await vehicleModel.updateOne(vehicleQuery,vehicleUpdate)
         res.status(200).send()
        } catch (error) {
            return errorGenarator(5000,res)
        }
     }
}