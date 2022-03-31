const errorGenarator = require("../utils/errorGenarator");
const {adminModel} = require('../model')
const { sign } = require("jsonwebtoken");
const { TOKEN_SECRET_ADMIN } = require("../config/variables");

module.exports ={
    verification : async(req,res)=>{
       try {
        let {name,passcode} =req.body
        let query = {
            name:name,
            passcode:passcode
        }
        let admin = await adminModel.findOne(query)
        if(!admin){
            return errorGenarator(1009,res)
        }
        else{
         let token = await sign({_id:admin._id,name:admin.name,role:admin.role},TOKEN_SECRET_ADMIN)
         let response ={
            access_token :token,
            name:admin.name,
            role:admin.role
         } 
          return res.status(200).send(response)
        }
       } catch (error) {
          return errorGenarator(500,res)
       }
    }
}