const mongoose = require('mongoose')

const postShema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc: String,
    likes:[],
    Image:String,
}, {timestamps:true}); 

const postModel = mongoose.model('posts', postShema)

module.exports = postModel
