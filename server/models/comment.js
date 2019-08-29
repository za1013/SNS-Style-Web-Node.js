const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentWriterImg : {
        type : String,
        required : true,
    },
    commentWriter : {
        type : String,
        required : true,
        match : /^[A-Za-z]{2,10}$/,
    },
    commentContent : {
        type : String,
        required : true,
    },
    commentDate : {
        type : Date,
        default : Date.now(),
        required : true,
    }
})

module.exports = mongoose.model('Comment', commentSchema)