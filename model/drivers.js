const {Schema,model} = require('mongoose')

const driverSchema = Schema({
    name :{
        type:String,
        required:true,
    },
    phone :{
        type:String,
        required:true,
        unique:true
    },
    age :{
        type:Number,
        required:true
    },
    license:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true 
    },
    vehicle:{
        type:String,
        default:null 
    },
    location:{
        type:String,
        required:true
    }
})
 
module.exports = model('drivers',driverSchema)