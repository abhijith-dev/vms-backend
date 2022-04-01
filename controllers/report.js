const errorGenarator = require("../utils/errorGenarator")
const {reportModel} = require('../model')
const sheet = require('xlsx')
const fs = require('fs')
const FILE_NAME = 'report.csv'
const SHEET_NAME = 'report'
module.exports={
    list :async(req,res)=>{
       try {
          let reports = await reportModel.find()
          res.status(200).send(reports)
       } catch (error) {
           return errorGenarator(5000,res)
       }
    },
    download: async(req,res)=>{
        try {
            let data = await (await reportModel.find()).map((ele,index)=>{
                return {
                    S_No:index+1,
                    Operation:ele.operation,
                    Date:ele.date,
                    Time:ele.time,
                    Status:ele.status,
                    Amount:ele.amount      
                }
            })
            const ws = sheet.utils.json_to_sheet(data)
            const wb = sheet.utils.book_new()
            sheet.utils.book_append_sheet(wb,ws,SHEET_NAME)
            sheet.writeFile(wb,FILE_NAME)
            return res.download(FILE_NAME,err=>{
                if(!err){
                    fs.unlinkSync(FILE_NAME)
                }
                else{
                    return errorGenarator(5000,res)
                }
            })
         } catch (error) {
             return errorGenarator(5000,res)
        }
    }
}