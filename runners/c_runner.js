const {spawn}= require('node:child_process')

const runC=(submission)=>
{
    return new Promise((resolve, reject)=>{
        const runner=spawn(`./tmp/outputs/${submission._id}.out`)
        runner.stdin.write(`${submission.stdin} \n`)
        runner.stdout.on('data', (data)=>{
            resolve(data)
        })
        runner.stderr.on('error', (error)=>
        {
            console.log(error)
            reject(error)
        })
    })
}

module.exports=runC