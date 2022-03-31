const {Schema,model} = require('mongoose')

const adminSchema = Schema({
    name:{
        type:String,
        required:true
    },
    passcode:{
        type:String,
        required:true 
    },
    role:{
        type:String,
        required:true 
    }
})
module.exports = model('admin',adminSchema)