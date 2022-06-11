const fs=require('fs/promises')
const {spawn, execFile, exec}=require('node:child_process')

const executeJava=async (submission)=>
{
    console.log("This is before the promise section of the function")
    const submissionId=submission._id
    const file=await fs.writeFile(`./tmp/codes/${submissionId}.java`, submission.source_code)

    return new Promise((resolve, reject)=>
    {
        const executor = spawn("java", [
            `./tmp/codes/${submissionId}.java`,
          ]);
          let outputString = "",
            errorString = "";
    
          if (submission.stdin) {
            executor.stdin.write(submission.stdin);
            executor.stdin.end();
          }
    
          executor.stdin.on("error", (...args) => {
            console.log("stdin err", args);
          });
    
          executor.stdout.on("data", (data) => {
            outputString=data.toString()
            //resolve(data)
          });
          executor.stderr.on("data", (data) => {
            errorString=data.toString()
            //reject(data)
          });
          executor.on("exit", () => {
            if (errorString) reject(errorString);
            resolve(outputString);
          });
    })
}

module.exports=executeJava