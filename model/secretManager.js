const {Schema,model} = require('mongoose')

const secretManagerSchema = Schema({
    email:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    expiresIn:{
        type:String,
        required:true  
    }
})

module.exports = model('seceret_manager',secretManagerSchema)