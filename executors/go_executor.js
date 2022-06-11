const fs=require('fs/promises')
const {exec, spawn} = require('node:child_process')




/*
const executeGo=async (submission)=>
{
    console.log("This is before the promise section of the function")
    const submissionId=submission._id
    const file=await fs.writeFile(`./tmp/codes/${submissionId}.go`, submission.source_code)
    return new Promise((resolve, reject)=>{
        exec(`go run ./tmp/codes/${submissionId}.go`, (error, stdout, stderr)=>{
            if (error)
            {
                console.log("Promise rejected from here")
                reject(error)
            }
            if (stderr)
            {
                reject(stderr)
            }
            if (stdout)
            {
                console.log("Stdout was obtained")
                resolve(stdout)
            }
            resolve()
        })
        
    })
}
*/

const executeGo=async (submission)=>
{
    console.log("This is before the promise section of the function")
    const submissionId=submission._id
    await fs.mkdir(`./tmp/codes/${submissionId}`)
    const file=await fs.writeFile(`./tmp/codes/${submissionId}/${submissionId}.go`, submission.source_code)
    return new Promise((resolve, reject)=>
    {
        exec(`cd ./tmp/codes/${submissionId} && go mod init ${submissionId} && go build `, (error, stdout, stderr)=>
        {
            if (error)
            {
                console.log("Error in exec")
                //reject(error)
            }
            if (stderr)
            {
                console.log("Stderr in exec")
                //reject(stderr)
            }
            console.log("No error occured in exec")
            resolve(stdout)
        })
    })
}



module.exports=executeGo