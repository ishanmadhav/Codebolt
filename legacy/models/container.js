const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const containerSchema=new Schema({
    dockerFile:  {
        type: String,
        required: true
    }
})

const Container=mongoose.model('Container', containerSchema)

module.exports=Container