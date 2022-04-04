const { bookingModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")

module.exports ={
    vehicle: async(req,res)=>{
        try {
            let id = req.params.id
           let vehicle = await bookingModel.findOne({vehicle:id,status:'On Raid'}) 
           if(!vehicle){
               return errorGenarator(1019,res)
           }
           
        } catch (error) {
            return errorGenarator(5000,res)
        }
    }
}