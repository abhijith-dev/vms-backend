const errorGenarator = require("../utils/errorGenarator");
const {vehicleModel} = require('../model')

module.exports ={
    bulkCreate: async(req,res)=>{
       let data = req.body 
       try {
        await vehicleModel.insertMany(data) 
        return res.status(201).send()

       } catch (error) {
          return errorGenarator(500,res)
       }
    },
    getAll: async(req,res)=>{
        try {
            let vehicles = await vehicleModel.find().populate('drivers')
            return res.status(200).send(vehicles)
        } catch (error) {
            return errorGenarator(500,res)
        }
    },
    getSingle: async(req,res)=>{
        try {
            let {id} = req.params
            let vehicle = await vehicleModel.findOne({_id:id}).populate('drivers')
            if(!vehicle){
                return errorGenarator(1019,res)
            }
           return res.status(200).send(vehicle)  
        } catch (error) {
            return errorGenarator(500,res)  
        }
    },
    update: async(req,res)=>{
        try {
            let {id} = req.params
            let updateQuery = req.body
            let vehicle = await vehicleModel.updateOne({_id:id},updateQuery)
            if(!vehicle.matchedCount){
                return errorGenarator(1019,res)
            }
           return res.status(200).send()  
        } catch (error) {
            return errorGenarator(500,res)  
        }
    },
    delete: async(req,res)=>{
        try {
            let {id} = req.params
            let vehicle = await vehicleModel.deleteOne({_id:id})
            if(!vehicle.deletedCount){
                return errorGenarator(1019,res)
            }
           return res.status(200).send() 
        } catch (error) {
            return errorGenarator(500,res)  
        }
    }
}