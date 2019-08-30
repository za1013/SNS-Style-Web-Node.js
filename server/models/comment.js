const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentWriterImg : {
        type : String,
    },
    writingPost : {
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

commentSchema.statics.create = function(req, id){

    let newComment = new this()
    newComment.writingPost = id
    newComment.commentWriter = req.user.username
    newComment.commentContent = req.body.comment
    newComment.commentDate = Date.now()

    return newComment.save()
}

module.exports = mongoose.model('Comment', commentSchema)