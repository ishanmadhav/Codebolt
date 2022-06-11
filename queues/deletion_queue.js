const {Queue, Worker}=require('bullmq')
const {alt_connection}=require('../utility/connection')
const {unlink}=require('fs/promises')
const Submission = require('../models/submission')


const deletionQueue=new Queue('deletionqueue', {connection: alt_connection})

const addToDeletionQueue=async (submission)=>
{
    try{
        await deletionQueue.add(`${submission._id}`, {submissionId: submission._id})
        console.log("Submission was added for deletion")
    }
    catch(error)
    {
        console.log(error)
    }
}

const deleteWorker=new Worker('deletionqueue', async (job)=>
{
    try{
        console.log("The deletion worker started up")
        const submission=await Submission.findById(job.data.submissionId)
        await unlink(`./tmp/codes/${submission._id}.${submission.language}`)
        return submission
    }
    catch(error)
    {
        console.log(error)
        return error
    }
}, {connection: alt_connection})

module.exports={deletionQueue, deleteWorker, addToDeletionQueue}