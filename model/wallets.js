const {Schema,model} = require('mongoose')

const walletSchema = Schema({
    address:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        default:'0.00'
    }
})

module.exports = model('wallets',walletSchema)