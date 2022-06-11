const path=require('path')
const fs=require('fs/promises')
const {exec, spawn} = require('node:child_process')



//await exec('g++ -o ./tmp/outputs/main.exe ./tmp/codes/test.cpp')

const executeC=async (submission)=>
{
    console.log("This is before the promise section of the function")
    const submissionId=submission._id
    const file=await fs.writeFile(`./tmp/codes/${submissionId}.c`, submission.source_code)
    return new Promise((resolve, reject)=>{
        exec(`gcc -o ./tmp/outputs/${submission._id}.out ./tmp/codes/${submission._id}.c`, (error, stdout, stderr)=>{
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


module.exports=executeC