const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        match : /^[A-Za-z]{2,10}$/,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    },
    password : {
        type : String,
        required : true,
    },
    admin : {
        type : Boolean,
        default : false,
    },
    nickName : {
        type : String,
        required : true,
        unique : true,
        match : /^[A-Za-z]{2,10}$/,
    },
    likeItem : {
        type: [String],
    }
})

userSchema.statics.create = function(params){
    console.log("Create User")
    
    let likeList = []
    if(params.likeCoding) likeList.push(params.likeCoding)
    if(params.likeDaily) likeList.push(params.likeDaily)
    if(params.likeFood) likeList.push(params.likeFood)
    if(params.likeStudy) likeList.push(params.likeStudy)
    if(params.likeFashion) likeList.push(params.likeFashion)
    if(params.likeMusic) likeList.push(params.likeMusic)

    const user = new this()
    user.username = params.username
    user.email = params.email
    user.password = wrapHashPassword(params.password)
    user.nickName = params.nickName
    user.likeItem = likeItem

    return user.save()
}

userSchema.statics.findOneByUsername = function(email){
    return this.findOne({'email' : email}).exec()
}

userSchema.methods.assignAdmin = function(){
    this.admin = true
    return this.save()
}

userSchema.methods.comparePassword = function(inputPassword){
    return bcrypt.compareSync(inputPassword, this.password)
}

function wrapHashPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


module.exports = mongoose.model('User', userSchema)