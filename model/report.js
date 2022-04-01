const {Schema,model} = require('mongoose')

const reportSchema = Schema({
    operation:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
       type:String,
       required:true
    },
    status:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
})

module.exports = model('report',reportSchema)