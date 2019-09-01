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
        type : [{ type : Schema.Types.ObjectId, ref : 'User' }]
    },
    postComment : {
        type : [{ type : Schema.Types.ObjectId, ref : 'Comment'}]
    },
    writeDate : {
        type : Date,
        default : new Date(),
        required : true,
    }
})

module.exports = mongoose.model('Post', postSchema)

// ? 매개변수로 req.body 를 받을 예정 표현만 params 으로
postSchema.statics.create = function(req){

    const post = new this()
    post.postWriter = req.user.username
    post.postWriterNick = req.user.nickName
    post.postTitle = req.body.postTitle
    post.postContent = req.body.postContent,
    post.writeDate = Date.now()

    if(req.body.postTag){
        let temp = req.body.postTag
        temp = temp.split("#")
        temp.shift()
        post.postTags = temp
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