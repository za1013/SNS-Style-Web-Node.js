const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new mongoose.Schema({
    postWriter : {
        type : String,
        required : true,
    },
    postWriterNick : {
        type : String,
        required : true,
    },
    postTitle : {
        type : String,
        required : true
    },
    
    postContent : {
        type : String,
        required : true,
    },

    postTags : {
        type : [String],
    },

    likeMember : {
        type : Schema.ObjectId,
        ref : 'User'
    },
    postComment : {
        type : Schema.ObjectId,
        ref : "Comment"
    },
    writeDate : {
        type : Date,
        default : Date.now(),
        required : true,
    }
})

module.exports = mongoose.model('Post', postSchema)

// ? 매개변수로 req.body 를 받을 예정 표현만 params 으로
postSchema.statics.create = function(req){

    console.log("Test Point User : ", req.user)
    console.log("Test Point Body : ", req.body)


    const post = new this()
    post.postWriter = req.user.username
    post.postWriterNick = req.user.nickName
    post.postTitle = req.body.postTitle
    post.postContent = req.body.postContent
    if(req.body.postTags){
        post.postTags = req.body.postTags
    }

    return post.save()
}

/* postSchema.statics.findPostFirst = function(res){
    this.find({}).sort({writeDate : "descending"})
    .then((postArr) => {
        let tmpArr = []
        for(let i = 0; i < 4;i++){
            tmpArr.push(postArr[i])
        }
        res.render('/board', { post : tmpArr })
    })
    .catch((err) => {
        req.flash('error', 'Post Finding Error')
    })
} */

module.exports = mongoose.model('post', postSchema)