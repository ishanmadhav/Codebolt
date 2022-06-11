const mongoose=require('mongoose')
const {Schema}=require('mongoose')
const Submission=require('./submission')


const userSchema=new Schema({
    name: String,
    user_id: {
        type: String,
        required: true
    },
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}],
    password: {
        type: String,
        required: true
    }
})

const User=mongoose.model('User', userSchema)

module.exports=User