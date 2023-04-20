const express=require('express')
const router=express.Router()

const {createUser, getUserById, getAllUsers, deleteUserById, authorizeUser, authenticateUser}=require('../controllers/user_controller')

router.post('/user', createUser)

router.get('/user/:id', getUserById)

router.get('/users', getAllUsers)

router.delete('/user/:id', deleteUserById)

router.post('/authenticate', authenticateUser) 

router.post('/authorize', authorizeUser)


module.exports=router