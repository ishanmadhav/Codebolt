const {SandboxedJob} = require('bullmq')
const {Queue, Worker} = require('bullmq')
const {connection}=require('../utility/connection')
const Submission=require('../models/submission')
const executeCPP=require('../executors/cpp_executor')
const runCpp=require('../runners/cpp_runner')
const executeC = require('../executors/c_executor')
const runC = require('../runners/c_runner')
const executePy = require('../executors/py_executor')
const executeGo = require('../executors/go_executor')
const runGo = require('../runners/runGo')
const executeJava = require('../executors/java_executor')

module.exports=async (job) =>{
    try{
        console.log("Worker running for "+job.data.submissionId)
        const savedSubmission=await Submission.findById(job.data.submissionId)
        var result;
        switch(savedSubmission.language)
        {
            case 'cpp': 
                await executeCPP(savedSubmission)
                result=await runCpp(savedSubmission)
                console.log(result.toString())
                break;
            case 'c':
                await executeC(savedSubmission)
                result=await runC(savedSubmission)
                console.log(result.toString())
                break;
            case 'py':
                result=await executePy(savedSubmission)
                console.log(result.toString())
                break;
            case 'go':
                await executeGo(savedSubmission)
                console.log("Is this even starting or what")
                result=await runGo(savedSubmission)
                console.log(result.toString())
                break;
            case 'java':
                result=await executeJava(savedSubmission)
                console.log(result.toString())
                break;
        }
        savedSubmission.stdout=result.toString()
        savedSubmission.status=2
        await savedSubmission.save()
        return savedSubmission
    }
    catch(error)
    {
        console.log(error)
    }
}