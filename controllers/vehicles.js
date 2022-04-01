const errorGenarator = require("../utils/errorGenarator");
const {vehicleModel} = require('../model')

module.exports ={
    bulkCreate: async(req,res)=>{
       let data = req.body 
       try {
        await vehicleModel.insertMany(data) 
        return res.status(201).send()

       } catch (error) {
          return errorGenarator(5000,res)
       }
    },
    getAll: async(req,res)=>{
        try {
            let {type} = req.query
            type = parseInt(type)
            if(type === 1){
              let vehicles = await vehicleModel.find().populate('drivers')
              return res.status(200).send(vehicles)
            }
            else if(type === 2){
              let query ={drivers:null}
              let vehicles = await vehicleModel.find(query).populate('drivers')
              return res.status(200).send(vehicles)
            }
            else{
              return errorGenarator(5000,res)
            }
        } catch (error) {
            return errorGenarator(5000,res)
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
            return errorGenarator(5000,res)  
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
            return errorGenarator(5000,res)  
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
            return errorGenarator(5000,res)  
        }
    }
}