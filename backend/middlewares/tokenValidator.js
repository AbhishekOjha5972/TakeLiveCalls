require('dotenv').config();
const jwt = require("jsonwebtoken")
const tokenValidator = (req,res,next) =>{
    let token = req.headers.authorization
    jwt.verify(token, process.env.secretKey, function(err, decoded) {
        if(decoded){
            req.headers.userId = decoded.userId
            next()
        }else{
            res.status(401).json({message:"token expired"})
        }
      });
}
module.exports = tokenValidator