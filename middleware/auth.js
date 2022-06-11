const jwt=require('jsonwebtoken')
const User=require('../models/user')

const isAuthenticated=async (req, res, next)=>
{
    try{
        console.log(req.headers)
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1];
            console.log(`still inside the middleware.... ${token}')`)
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded)
            next();
        }
        else
        {
            res.status(500).json({message: "User not authenticated"})
        }
       
    }
    catch(error)
    {
        console.log(error)
        res.status(401).json({message: "User not authenticated"})
    }
}

module.exports={isAuthenticated}