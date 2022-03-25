const { verify } = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/variables");
const wallets = require("../model/wallets");
const errorGenarator = require("../utils/errorGenarator");

module.exports = function ({ browser_id, user_agent, access_token,wallet}) {
  return async function (req, res, next) {
    if (browser_id) {
      let b_id = req.headers["browser-id"];
      if (!b_id) {
        return errorGenarator(1000, res);
      }
    }
    if (user_agent) {
      let u_agent = req.headers["user-agent"];
      if (!u_agent) {
        return errorGenarator(1001, res);
      }
    }
    if (access_token) {
      let a_token = req.headers["access-token"];
      if (!a_token) {
        return errorGenarator(1002, res);
      } else {
        try {
          let token = a_token.split(" ")[1]
          let user = await verify(token, TOKEN_SECRET);
          req.user = user._id;
        } catch (error) {
          return errorGenarator(1003, res);
        }
      }
    }
    if(wallet){
      let wallet_address = req.headers['wallet-address']
      let wallet_amount = req.headers['wallet-amount']
      if(!wallet_address || !wallet_amount){
        return errorGenarator(1006, res);
      }
      req.wallet_address = wallet_address
      req.wallet_amount = wallet_amount
    }
    next();
  };
};
