const { sign } = require("jsonwebtoken");
const {compare} = require('bcryptjs')
const { TOKEN_SECRET } = require("../config/variables");
const { userModel, walletModel, secretManager } = require("../model");
const errorGenarator = require("../utils/errorGenarator");
const { hash, genSalt } = require("bcryptjs");
const { sendMail } = require("../services/emailServices");

const updateble = ['name','city']

module.exports = {
  create: async (req,res) => {
    try {
      const { name, password, email, city, phone } = req.body;
      let userObject = await userModel({
        name,
        password,
        email,
        city,
        phone,
      });
      let user = await userObject.save();
      let walletObject = await walletModel({
        address: req.wallet_address,
        amount: req.wallet_amount,
        belongsTo:user._id
      });
      let wallet = await walletObject.save();
      await userModel.updateOne({ _id: user._id }, { wallet: wallet._id });
      let token = await sign({ _id: user._id, name: user.name }, TOKEN_SECRET, {
        expiresIn: "7d",
      });
      let response = {
        access_token: token,
        timestamp: Date.now(),
        expiredIn: `168 hours`,
      };
      return res.status(201).send(response);
    } catch (error) {
      if (error.keyPattern.email) {
        return errorGenarator(1004, res);
      } else if (error.keyPattern.phone) {
        return errorGenarator(1005, res);
      } else {
        return errorGenarator(5000, res);
      }
    }
  },

  login : async (req,res)=>{
     try {
      const {credential,password} = req.body
      let user =await  userModel.findOne({
         $and:[{isDeleted:false, $or:[{ phone:credential },{ email:credential }]}]
      })
      if(!user){
        return errorGenarator(1007,res)
      }
      let valid = await compare(password,user.password)
      if(!valid){
        return errorGenarator(1008,res)
      }
      else{
          await walletModel.updateOne(
          {
            belongsTo:user._id
          },
        {
          belongsTo:user._id,
          address: req.wallet_address,
          amount: req.wallet_amount
        }, {upsert : true } );
        let wallet = await walletModel.findOne({belongsTo:user._id})
        await userModel.updateOne({ _id: user._id }, { wallet: wallet._id });
        let token = await sign({ _id: user._id, name: user.name }, TOKEN_SECRET, {
          expiresIn: "7d",
        });
        let response = {
          access_token: token,
          timestamp: Date.now(),
          expiredIn: `168 hours`,
        }
        return res.status(202).send(response)
      }
     } catch (error) {
       return errorGenarator(5000,res)
     }
  },

  fetch : async (req,res)=>{
     try {
       let user = await userModel.findOne({_id:req.user, isDeleted : false })
       if(!user){
         return errorGenarator(1009,res)
       }
       let response = {
         id : user._id,
         name : user.name,
         email : user.email,
         city: user.city,
         phone: user.phone
       }
       return res.status(200).send(response)
     } catch (error) {
       return errorGenarator(5000,res)
     }
  },
  
  update : async (req,res)=>{
    try {
      let invalid = false
      let fields = Object.keys(req.body)
      fields.forEach(field =>{
        if(!updateble.includes(field)){
          invalid = true
          return
        }
      })
     if(invalid){
       return errorGenarator(1010,res)
     }
     else{
      let udpateObject ={}
      fields.forEach(field=>{
         udpateObject[field] = req.body[field]
      })
      await userModel.updateOne({_id : req.user, isDeleted : false },udpateObject)
      res.status(204).send()
     }
    } catch (error) {
      return errorGenarator(5000,res)
    }
  },

  delete : async(req,res)=>{
     try {
       const deleteQuery = {
          isDeleted:true
       }
       await userModel.updateOne({_id : req.user, isDeleted : false },deleteQuery)
       await walletModel.deleteOne({belongsTo:req.user})
       return res.status(204).send()
     } catch (error) {
      return errorGenarator(5000,res)
     }
  },

  fetchWallet : async(req,res)=>{
      try {
        let user = await userModel.findOne({_id:req.user, isDeleted : false}).populate('wallet')
        if(user.wallet === null){
          return errorGenarator(1011,res)
        }
        else{
           let response = {
              user_id : user._id,
              address : user.wallet.address,
              balance : user.wallet.amount
           }
          return res.status(200).send(response)
        }
      } catch (error) {
        return errorGenarator(5000,res)
      }
  },

  loadWallet : async(req,res)=>{
    try {
      let address = req.wallet_address
      let balance = req.wallet_amount
      await walletModel.updateOne(
        {
          belongsTo:req.user
        },
      {
        belongsTo:req.user,
        address: address,
        amount: balance
      }, {upsert : true } );
      let wallet = await walletModel.findOne({belongsTo:req.user})
      await userModel.updateOne({ _id: req.user,isDeleted : false }, { wallet: wallet._id });
      return res.status(204).send()
    } catch (error) {
      return errorGenarator(5000,res)
    }
  },

  resetPasswordInternal : async(req,res)=>{
      try {
        let {pwd1,pwd2} = req.body
           let user =  await userModel.findOne({_id:req.user, isDeleted:false })
           if(!user){
            return errorGenarator(1009,res)
          }
           let valid =await compare(pwd1,user.password)
           if(!valid){
            return errorGenarator(1012,res)
           }
           else{
            let salt = await genSalt(10);
            let _hash = await hash(pwd2, salt)
            await userModel.updateOne({_id:req.user,isDeleted:false},{
              password : _hash
            })
            res.status(200).send()
           }
      } catch (error) {
        return errorGenarator(5000,res)
      }
  },
  resetPasswordExternal : async(req,res)=>{
     try {
       let {email} = req.body
       let user = await userModel.findOne({email:email,isDeleted:false})
       if(!user){
        return errorGenarator(1009,res)
      }
      //genaring PIN 
      let pin = Math.floor(Math.random()*1000000)
      let date =new Date()
      let current_time = date.getTime()
      let expire_obj = new Date(current_time + 10*60000)
      let expiresIn = expire_obj.getTime()
      //store in secret manager
      await secretManager.updateOne(
        { email : email },{
          email:email,
          pin:pin,
          expiresIn:expiresIn
        },
        {upsert:true}
      )
      let name = user.name
      await sendMail(email,{name,pin})
      let response ={}
      response.email = email
      return res.status(200).send(response)
     } catch (error) {
      if(error.message === '!template'){
        console.log(error)
        return errorGenarator(5000,res)
      }
      else if(error.message === '!mail'){
        console.log(error)
        return errorGenarator(1014,res)
      }
      else{
        console.log(error)
        return errorGenarator(1015,res)
      }
     }
  },

  resetPasswordExternalVerify :async (req,res)=>{
      try {
        let {pin,password,email} = req.body
        let date =new Date()
        let user = await userModel.findOne({email:email,isDeleted:false})
        if(!user){
         return errorGenarator(1009,res)
       }
      let valid = await secretManager.findOne({email:email,active:true,pin:pin})
      if(!valid || valid.expiresIn<date.getTime()){
        return errorGenarator(1013,res)
      }
      else{
        await secretManager.updateOne({email:email,pin:pin,active:true},{active:false})
        let salt = await genSalt(10);
        let _hash = await hash(password,salt)
        await userModel.updateOne({email:email},{password:_hash})
        res.status(200).send()
      }
      } catch (error) {
        return errorGenarator(5000,res) 
      }
  },
    all:async(req,res)=>{
    try {
      let response = await userModel.find()
      return res.status(200).send(response)
    } catch (error) {
      return errorGenarator(5000,res) 
    }
  }
};
 
