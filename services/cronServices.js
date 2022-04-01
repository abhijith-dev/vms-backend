const cron = require('node-cron')
const {secretManager} = require('../model')

const clearSecretManager = async()=>{
    let exp = '* * * * *'
    cron.schedule(exp, async() => {
        let date = new Date()
        await secretManager.deleteMany({active:false})
        await secretManager.deleteMany({expiresIn:{$lt:date.getTime()}})
      })
}

const init = async()=>{
    await clearSecretManager()
}

module.exports ={
    init
}