const express=require('express')
const router=express.Router()
const {executeSubmission, addSubmission, getSubmissionById}=require('../controllers/submission_controller')
const {isAuthenticated} = require('../middleware/auth')


//Auth middleware to be added later on
router.post('/execute', executeSubmission)

router.post('/submit', addSubmission)

router.get('/submission/:id', getSubmissionById)

module.exports=router