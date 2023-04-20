const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const problemSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    expected_output: {
        type: String
    },
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}],
    setter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tester: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_at: {
        type: Date,
        default: Date.now()
    },
})

const Problem=mongoose.model('Problem', problemSchema)

module.exports=Problem