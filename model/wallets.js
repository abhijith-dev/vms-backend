const {Schema,model} = require('mongoose')

const walletSchema = Schema({
    address:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        default:'0.00'
    },
    belongsTo:{
        type:String,
        required:true
    }
})

module.exports = model('wallets',walletSchema)