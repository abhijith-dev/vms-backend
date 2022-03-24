const { sign } = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/variables");
const { userModel, walletModel } = require("../model");
const errorGenarator = require("../utils/errorGenarator");

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
};
