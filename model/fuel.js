const {Schema,model} = require('mongoose')
const reportModel = require('../model/report')

const fuelSchema = Schema({
    f_type:{
       type:String,
       required:true 
    },
    used:{
        type:String,
        required:true 
    },
    amount:{
        type:String,
        required:true
    },
    v_id:{
        type:Schema.Types.ObjectId,
        ref:'vehicles'
    }
})

fuelSchema.post('save',async function(){
   let data = this
   let date =new Date()
   let report = await reportModel({
       operation:'Filling fuel',
       date:date.toDateString(),
       time:date.toTimeString(),
       status:'Expense',
       amount:data.amount
   })
   await report.save()
})
module.exports=model('fuels',fuelSchema)