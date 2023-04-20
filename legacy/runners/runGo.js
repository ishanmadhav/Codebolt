const {spawn}= require('node:child_process')

const runGo=(submission)=>
{
    console.log("This function was started ")
    return new Promise((resolve, reject)=>{
        const runner=spawn(`./tmp/codes/${submission._id}/${submission._id}`)
        if (submission.stdin)
        {
            runner.stdin.write(`${submission.stdin} \n`)
        }
        
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

module.exports=runGo