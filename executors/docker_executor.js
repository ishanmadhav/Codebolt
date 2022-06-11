const {exec}=require('node:child_process')

const buildImage=async (containerId)=>
{
    console.log(`Going to execute docker build -t ${containerId} .`)
    return new Promise((resolve, reject)=>
    {
        exec(`cd ./tmp/containers/${containerId} && docker build -t ${containerId} .`, (error, stdout, stderr)=>
        {
            if (error)
            {
                reject(error)
            }
            if (stderr)
            {
                reject(stderr)
            }
            if (stdout)
            {
                resolve(stdout)
            }
            resolve()
        })
    })
}

const runImage=async (containerId)=>
{
    return new Promise((resolve, reject)=>
    {
        console.log("Now trying to build a container out of the image")   
        exec(`cd ./tmp/containers/${containerId} && docker run -dp 3000:3000 ${containerId}`, (error, stdout, stderr)=>
            {
                if (error)
                {
                    console.log(error)
                    reject(error)
                }
                if (stderr)
                {
                    console.log(stderr)
                    reject(stderr)
                }
                if (stdout)
                {
                    console.log(stdout)
                    resolve(stdout)
                }
                resolve()
            })
    })
}

const listAllContainers=async ()=>
{
    return new Promise((resolve, reject)=>
    {
        exec(`docker ps`, (error, stdout, stderr)=>
        {
            if (error)
            {
                reject(error)
            }
            if (stderr)
            {
                reject(stderr)
            }
            if (stdout)
            {
                resolve(stdout)
            }
        })
    })
}


module.exports={buildImage, runImage, listAllContainers}