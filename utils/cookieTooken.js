const getJwtToken = require('../helpers/getJwtToken')


const cookieToken = (user,res)=>{
    const token = getJwtToken(user.userID);
    const options ={
        expires: new Date (Date.now() + 3 * 24 * 60 * 60*1000),
        httpOnly : true
    }
    user.userPass = undefined;
    res.status(200).cookie('token',token,options).json({
        success : true,
        code:200,
        token,
        user
    })
}

module.exports =cookieToken;