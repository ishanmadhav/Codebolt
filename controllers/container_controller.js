const {exec, spawn}=require('node:child_process')
const fs=require('fs/promises')
const Container = require('../models/container')
const {buildImage, runImage, listAllContainers}=require('../executors/docker_executor')


const createContainer=async (req, res)=>
{
    try{
        console.log(req.body)
        const tempContainer=new Container({
            dockerFile: req.body.dockerFile
        })
        const savedContainer=await tempContainer.save()
        await fs.mkdir(`./tmp/containers/${savedContainer._id}`)
        const file=await fs.writeFile(`./tmp/containers/${savedContainer._id}/Dockerfile`, req.body.dockerFile)
        const imgres=await buildImage(savedContainer._id)
        console.log(imgres)
        console.log("Image built successfully")
        await runImage(savedContainer._id)
        
    }
    catch(error)
    {
        console.log(error)

    }

}

const getContainers=async (req, res)=>
{
    try{
        const result=await listAllContainers()
        res.json(result)
    }
    catch(error)
    {
        console.log(error)
    }
}

const runContainerById=async (req, res)=>
{
    try{
        console.log("Running container by id")
        const result=await runImage(req.params.id)
        console.log(result)
        res.json(result)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports={createContainer, getContainers, runContainerById}