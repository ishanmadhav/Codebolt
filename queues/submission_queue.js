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

const submissionQueue=new Queue('submissionqueue', {connection: connection})
const codeProcessor=require('../processors/code_processor')

const addToSubmissionQueue=async (submission) =>
{
    await submissionQueue.add(`${submission._id}`, {submissionId: submission._id})
    console.log("Submission added to the queue")
}


const codeWorker=new Worker('submissionqueue', codeProcessor , {
    connection: connection,
    concurrency: 10
})

module.exports={submissionQueue, codeWorker, addToSubmissionQueue}