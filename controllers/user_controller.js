const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const createUser=async (req, res)=>
{
    try{
        const hashedPassword=await bcrypt.hash(request.body.password, 10)
        const tempUser=new User({
            name: req.body.name,
            user_id: req.body.user_id,
            password: hashedPassword,
            submissions: []
        })

        const savedUser=await tempUser.save()
        const token=jwt.sign({id:savedUser._id}, process.env.SECRET_KEY)
        return res.json({user: savedUser, token: token})
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getUserById=async (req, res)=>
{
    try{
        const user=await User.findById(req.params.id)
        res.json(user)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }
}

const getAllUsers=async (req, res)=>
{
    try{
        const users=await User.find()
        res.json(users)
    }
    catch(error)
    {
        console.log(error)
        res.status(404).json(error)
    }

}

const deleteUserById=async (req, res)=>
{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id)
        console.log("User deleted successfully")
        res.json(deleteUserById)
    }
    catch(error)
    {
        console.log(error)
        res.json(error)
    }

}

const authenticateUser=async (req, res)=>
{
    try{
        //JWT Auth or any other auth will go here will go here
        //Will be the go way to provide user with code execution
        //privelleges
        const user=await User.findById(req.body.userId)
        if (user)
        {
            const result=await bcrypt.compare(req.body.password, user.password)
            if (result)
            {
                const token=jwt.sign({id:user._id}, process.env.SECRET_KEY)
                res.json({user: savedUser, token: token})
            }
            else
            {
                res.status(400).json({message: "Passwords do not match"})
            }
            
        }

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }

}

const authorizeUser=async (req, res)=>
{
    try{

    }
    catch(error)
    {
        console.log(error)
    }

}


module.exports={createUser, getUserById, getAllUsers, deleteUserById, authenticateUser, authorizeUser}