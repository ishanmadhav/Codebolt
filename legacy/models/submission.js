const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const submissionSchema=new Schema({
    source_code: {
        type: String,
         required: true
    },
    stdin: {
        type: String,
        default: ''
    },
    stdout: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    finished_at: {
        type: Date
    },
    expected_output: {
        type: String
    }
})

const Submission=mongoose.model('Submission', submissionSchema)

module.exports=Submission