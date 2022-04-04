const {Schema,model} = require('mongoose')
const reportModel = require('./report')

const bookingSchema = Schema({
    user:{
        type:String,
        required:true
    },
    from :{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true 
    },
    amount:{
      type:Number,
      required:true
    },
    date:{
        type:String,
        required:true   
    },
    passanger:{
       type:Boolean,
        required:true
    },
    goods:{
        type:Boolean,
         required:true
     },
     transaction :{
        type:String,
        defualt:null
     },
    vehicle:{
        type:Schema.Types.ObjectId,
        ref:'vehicles'
    },
    driver:{
        type:Schema.Types.ObjectId,
        ref:'drivers'
    }
})
bookingSchema.post('save',async function(){
    let data = this
    let date =new Date()
    let report = await reportModel({
        operation:'Vehicle Booking',
        date:date.toDateString(),
        time:date.toTimeString(),
        status:'Profit',
        amount:data.amount
    })
    await report.save()

})

module.exports = model('bookings',bookingSchema)