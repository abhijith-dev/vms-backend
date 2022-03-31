const { driverModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")

module.exports={
    create: async(req,res)=>{
        try {
        let data = req.body
        let driverObj = await driverModel(data)
        let driver = await driverObj.save()
        let response ={id:driver._id}
        return res.status(201).send(response)
        } catch (error) {
           return errorGenarator(5000,res)
        }
    },

    getSingle: async(req,res)=>{
        try {
            let {id} = req.params
            let driver = await driverModel.findOne({_id:id})
            if(!driver){
                return errorGenarator(1020,res)
            }
           return res.status(200).send(driver)  
        } catch (error) {
            return errorGenarator(500,res)  
        }
    },

    getAll: async(req,res)=>{
        try {
            let drivers = await driverModel.find()
            return res.status(200).send(drivers)
        } catch (error) {
            return errorGenarator(500,res)
        }
    },

    update: async(req,res)=>{
        try {
            let {id} = req.params
            let updateQuery = req.body
            let driver = await driverModel.updateOne({_id:id},updateQuery)
            if(!driver.matchedCount){
                return errorGenarator(1020,res)
            }
           return res.status(200).send()  
        } catch (error) {
            return errorGenarator(500,res)  
        }
    },

    delete: async(req,res)=>{
        try {
            let {id} = req.params
            let driver = await driverModel.deleteOne({_id:id})
            if(!driver.deletedCount){
                return errorGenarator(1020,res)
            }
           return res.status(200).send() 
        } catch (error) {
            return errorGenarator(500,res)  
        }
    },

    uploadPicture: async(req,res)=>{
       try {
          return res 
       } catch (error) {
         return errorGenarator(500,res)  
       }
    }
}    