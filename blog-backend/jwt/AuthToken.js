const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function CreateTokenSvaeCokkies(userId,res) {
    const token = jwt.sign({userId},process.env.JWT_TOKEN_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        httpOlny:true,
        secure:true,
        sameSite:"strict"
    })
    await User.findByIdAndUpdate(userId, {token})
    return token ;
}

module.exports = CreateTokenSvaeCokkies 