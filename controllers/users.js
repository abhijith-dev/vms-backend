const { sign } = require("jsonwebtoken");
const {compare} = require('bcryptjs')
const { TOKEN_SECRET } = require("../config/variables");
const { userModel, walletModel } = require("../model");
const errorGenarator = require("../utils/errorGenarator");

const updateble = ['name','city']

module.exports = {
  create: async (req, res) => {
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
         $or:[{ phone:credential },{ email:credential }]
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
          address: req.wallet_address,
          amount: req.wallet_amount
        });
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
       let user = await userModel.findOne({_id:req.user})
       if(!user){
         return errorGenarator(1009,res)
       }
       let response = {
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
      await userModel.updateOne({_id : req.user},udpateObject)
      res.status(204).send()
     }
    } catch (error) {
      return errorGenarator(5000,res)
    }
  }
};
