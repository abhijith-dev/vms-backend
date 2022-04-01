const {Schema,model} = require('mongoose')

const vehilceSchema = Schema({
    name :{
        type:String,
        required:true
    },
    model :{
        type:String,
        required:true,
        unique:true
    },
    r_no :{
        type:String,
        required:true,
        unique:true
    },
    v_type:{
       type:Number,
       required:true 
    },
    company :{
        type:String,
        required:true,
    },
    p_range :{
        type:Number,
        required:true,
    },
    g_range :{
        type:Number,
        required:true,
    },
    v_cost :{
        type:Number,
        required:true, 
    },
    fuel:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    drivers:{
        type:Schema.Types.ObjectId,
        ref:'drivers'
    }

})

module.exports = model('vehicles',vehilceSchema)