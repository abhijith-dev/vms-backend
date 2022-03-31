const {DB_URI} = require('./variables')
const {connect} =  require('mongoose')
const log = console.log

module.exports = {
    init : async() =>{
       await connect(DB_URI)
       .then(sucess=>{
           log(`connected to database :${sucess.connections[0].port}`)
       })
       .catch(err=>{
           log(`connected to database ${err}`)
       })
    },
    terminate:async()=>{
        require('mongoose').disconnect()
    }
}