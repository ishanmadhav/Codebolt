const express=require('express')
const router=express.Router()
const {createContainer, getContainers, runContainerById, createSingleContainer}=require('../controllers/container_controller')

router.post('/container', createContainer)

router.post('/container/single', createSingleContainer)

router.get('/containers', getContainers)

router.post('/run_container/:id', runContainerById)

module.exports=router