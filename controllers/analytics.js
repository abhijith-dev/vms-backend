const { reportModel } = require("../model")
const errorGenarator = require("../utils/errorGenarator")

module.exports ={
    data: async(req,res)=>{
        try {
           let query = {date:req.body.date}  
           let reports = await (await reportModel.find(query)).map(result=>{
               return result.amount
           })
           return res.status(200).send(reports)

        } catch (error) {
           return errorGenarator(5000,res) 
        }
    }
}