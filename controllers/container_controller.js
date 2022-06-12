const {exec, spawn, spawnSync}=require('node:child_process')
const fs=require('fs/promises')
const fs2=require('fs')
const Container = require('../models/container')
const {buildImage, runImage, listAllContainers}=require('../executors/docker_executor')
const {removeContainer, removeImage, deleteFolder} = require('../utility/cleaup')

const {uuid} = require('uuidv4')
const { resolve } = require('node:path')


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

const createSingleContainer2=async (req, res) => {
    try {
        const containerId = uuid()
        const {source_code, stdin, language} = req.body;
        await fs.mkdir(`./tmp/containers/${containerId}`)
        fs2.copyFileSync(`./public/${language}/Dockerfile`,`./tmp/containers/${containerId}/Dockerfile`, fs2.constants.COPYFILE_EXCL,err=>{
            if(err)throw new Error("cannot create dockerfile")
            console.log("ccreated file successfully")
        })
        console.log(req.body)
        const file=await fs.writeFile(`./tmp/containers/${containerId}/test.${language}`, source_code)

        exec(`cd ./tmp/containers/${containerId} && docker image build --tag ${containerId} .`, (err, stdout, stderr) => {
            if(err)throw err;
            //if(stderr)throw stderr
            exec(`docker container run --name ${containerId} ${containerId} `, (err, stdout,stderr)=>{
                if(err)throw err;
                //if(stderr)throw stderr
                if(stdout){
                    console.log(stdout)
                    exec(`docker container rm ${containerId} && docker image rm ${containerId} && cd ./tmp/containers && rm -rf ${containerId}`)
                    // removeContainer(containerId)
                    // removeImage(containerId)
                    // deleteFolder(containerId)
                    res.json({message:stdout})
                }
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}
const createSingleContainer=async (req, res) => {
    try {
        const containerId = uuid()
        
       
        const {source_code, stdin, language} = req.body;
        await fs.mkdir(`./tmp/containers/${containerId}`)
        fs2.copyFileSync(`./public/${language}/Dockerfile`,`./tmp/containers/${containerId}/Dockerfile`, fs2.constants.COPYFILE_EXCL,err=>{
            if(err)throw new Error("cannot create dockerfile")
            console.log("ccreated file successfully")
        })
        console.log(req.body)
        const file=await fs.writeFile(`./tmp/containers/${containerId}/test.${language}`, source_code)

        exec(`cd ./tmp/containers/${containerId} && docker image build --tag ${containerId} . && cd .. && rm -rf ${containerId}`, (err, stdout, stderr) => {
            if(err)throw err;
            //if(stderr)throw stderr

            const container = spawn("docker",["container", "run", "--rm", "-i", "--name",`${containerId}`,`${containerId}`])
            container.stdin.write(`${stdin}\n`)
            container.stdout.on('data',(stdout)=>{
                console.log(stdout.toString())
                exec(`docker container rm ${containerId} && docker image rm ${containerId}`)
                res.status(200).json({message:stdout.toString()})

            })
            container.stderr.on("error",(error)=>{
                console.log(error)
                exec(`docker container rm ${containerId} && docker image rm ${containerId} `,err=>{
                    console.log(err)
                })
                res.status(404).json({message:"server error"})
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

module.exports={createContainer, getContainers, runContainerById, createSingleContainer}