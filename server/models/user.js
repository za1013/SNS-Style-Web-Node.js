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
    }
})

userSchema.statics.create = function(username, email, password){
    console.log("Create User")
    
    const user = new this()
    user.username = username
    user.email = email
    user.password = password
    console.log(user)

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
    return bcrypt.hashSync(password, bcrypt.genSalt(12), null)
}


module.exports = mongoose.model('User', userSchema)