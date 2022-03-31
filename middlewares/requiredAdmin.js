const { verify } = require("jsonwebtoken")
const { TOKEN_SECRET_ADMIN } = require("../config/variables")
const errorGenarator = require("../utils/errorGenarator")

module.exports = function({admin_token,role}){
   return async function(req,res,next){
       if(admin_token){
           let token = req.headers['admin-token']
           if (!token) {   
            return errorGenarator(1016, res);
          } else {
            try {
              let auth_token = token.split(" ")[1]
              let admin = await verify(auth_token,TOKEN_SECRET_ADMIN);
              if(role && admin.role !='Admin'){
                return errorGenarator(1017,res)
            }
            req.admin = admin._id
            next()
            } catch (error) {
              console.log(error)   
              return errorGenarator(1018, res);
            }
           }
       }
   }
}
