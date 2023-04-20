const express=require('express')
const mongoose = require('mongoose')
const app=express()
const cors=require('cors')

const PORT=process.env.PORT||5000
const CONNECTION_URL='mongodb://mongo:27017/codebolt'
const CONNECTION_URL2='mongodb://localhost/codebolt'

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const submissionRoutes=require('./routes/submission_routes')
const containerRoutes=require('./routes/container_routes')

app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

/* //queues

//const {submissionQueue} = require('./queues/submission_queue')
const {codeWorker} = require('./queues/submission_queue')
const {deleteWorker} = require('./queues/deletion_queue')

//Worker events
codeWorker.on('completed', (job, retval)=>
{
    console.log("This submission was successfully processed")
    console.log(retval)
})

codeWorker.on('failed', (job, error)=>
{
    console.log("This job failed")
    console.log(error)
})

codeWorker.on('error', (err)=>
{
    console.log("This job caused an error")
    console.log(err)
})

deleteWorker.on('completed', (job, retval)=>
{
    console.log("This submission source file was successfully deleted")
})

deleteWorker.on('failed', (job, error)=>
{
    console.log("This deletion failed")
    console.log(error)
})

deleteWorker.on('error', (err)=>
{
    console.log("This deletion caused an error")
    console.log(err)
})
*/

//

app.use('/', submissionRoutes)
app.use('/', containerRoutes)

app.get('/', async (req, res)=>
{
    res.send('Hey')
})


app.listen(PORT, ()=>
{
    console.log("The server is up and running on port " + PORT)
})