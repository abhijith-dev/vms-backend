const {adminModel} = require('../model')
const adminData = require('../public/assets/admins.json')

const adminSeederController =  async()=>{
   adminData.forEach(async(data) =>{
      let query = {passcode:data.passcode} 
      let options = {upsert:true}
      await adminModel.updateOne(query,data,options)
   }) 
}


function init(){
    adminSeederController()
}

module.exports ={
    init
}