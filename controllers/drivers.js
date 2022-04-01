const { driverModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")
const upload = require('../middlewares/mediaManager')
const multer = require('multer')
const { STATIC_IMAGE_PATH } = require("../config/variables")

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
            return errorGenarator(5000,res)  
        }
    },

    getAll: async(req,res)=>{
        try {
          let {type} = req.query
          type = parseInt(type)
          if(type === 1){
            let drivers = await driverModel.find()
            return res.status(200).send(drivers)
          }
          else if(type === 2){
            let query ={vehicle:null}
            let drivers = await driverModel.find(query)
            return res.status(200).send(drivers)
          }
          else{
            return errorGenarator(5000,res)
          }
        } catch (error) {
            return errorGenarator(5000,res)
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
            return errorGenarator(5000,res)  
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
            return errorGenarator(5000,res)  
        }
    },

    uploadPicture: async (req, res) => {
      try {
        let id = req.headers.id;
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError)
            return errorGenarator(1021, res)  
          else if (err) 
            return errorGenarator(1022, res)           
          else {
            let path = `${STATIC_IMAGE_PATH}${req.file.filename}`
            driverModel.updateOne({ _id: id }, { picture: path }, (err) => {
              if (!err) 
                res.status(200).send()
              else 
                return errorGenarator(1023, res)  
            })
          }
        })
      } catch (error) {
        return errorGenarator(5000, res)
      }
    }
}    