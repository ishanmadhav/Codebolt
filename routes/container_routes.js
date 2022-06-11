const express=require('express')
const router=express.Router()
const {createContainer, getContainers, runContainerById}=require('../controllers/container_controller')

router.post('/container', createContainer)

router.get('/containers', getContainers)

router.post('/run_container/:id', runContainerById)

module.exports=router