const {exec} = require('node:child_process')
const {path} = require('path')

const removeContainer = async(containerId)=>{
    exec(`docker container ls --all`, (error, stdout, stderr)=>{
        if(error) throw error
        if(stdout){
            console.log(stdout)
            exec(`docker container rm ${containerId}`)
        }

    })
}

const removeImage = async(imageId)=>{
    exec(`docker image ls`, (error, stdout, stderr)=>{
        if(error) throw error
        if(stdout){
            console.log(stdout)
            exec(`docker image rm ${imageId}`)
        }

    })
}

const deleteFolder = async(folderId)=>{
    exec(`cd ./tmp/containers rm -f ${folderId}`)
}

module.exports = {removeImage,removeContainer,deleteFolder}