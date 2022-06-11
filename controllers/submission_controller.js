const Submission=require('../models/submission')
const executeCPP=require('../executors/cpp_executor')
const runCpp=require('../runners/cpp_runner')
const executeC = require('../executors/c_executor')
const runC = require('../runners/c_runner')
const executePy = require('../executors/py_executor')
const executeGo = require('../executors/go_executor')
const runGo = require('../runners/runGo')
const executeJava = require('../executors/java_executor')
const {addToSubmissionQueue} = require('../queues/submission_queue')
const { addToDeletionQueue } = require('../queues/deletion_queue')

const executeSubmission=async (req, res)=>
{
    try{
        const newSubmission=new Submission({
            source_code: req.body.source_code,
            stdin: req.body.stdin,
            language: req.body.language,
        })

        const savedSubmission=await newSubmission.save();
        var result;
        switch(req.body.language)
        {
            case 'cpp': 
                await executeCPP(savedSubmission)
                result=await runCpp(savedSubmission)
                console.log(result.toString())
                res.json({
                    output: result.toString()
                })
                break;
            case 'c':
                await executeC(savedSubmission)
                result=await runC(savedSubmission)
                console.log(result.toString())
                res.json({
                    output: result.toString()
                })
                break;
            case 'py':
                result=await executePy(savedSubmission)
                console.log(result.toString())
                res.json({
                    output: result.toString()
                })
                break;
            case 'go':
                await executeGo(savedSubmission)
                console.log("Is this even starting or what")
                result=await runGo(savedSubmission)
                console.log(result.toString())
                res.json({
                    output: result.toString()
                })
                break;
            case 'java':
                result=await executeJava(savedSubmission)
                console.log(result.toString())
                res.json({
                    output: result.toString()
                })
                break;
                


        }
        
    }
    catch(error)
    {
        console.log("This is from the catch section")
        console.log(error)
        res.json(error)
    }
}

const addSubmission=async (req, res)=>
{
    try{
        const newSubmission=new Submission({
            source_code: req.body.source_code,
            stdin: req.body.stdin,
            language: req.body.language,
        })

        const savedSubmission=await newSubmission.save();
        addToSubmissionQueue(savedSubmission)
        res.json(savedSubmission)
    }
    catch(error)
    {

    }
}

const getSubmissionById=async (req, res)=>
{
    try{
        const submission=await Submission.findById(req.params.id)
        addToDeletionQueue(submission)
        return res.json(submission)
    }
    catch(error)
    {
        console.log(error)
        res.json({message: "No such submission found"})
    }
}


module.exports={executeSubmission, addSubmission, getSubmissionById}