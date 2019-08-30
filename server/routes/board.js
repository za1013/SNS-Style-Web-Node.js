const express = require('express')
const router = express.Router()

const Post = require('../models/post')


router.get('/', (req, res) => {
    Post.find({}).sort({writeDate : 'descending'}).limit(4)
    .then((postArr) => {
        res.render('board', { user : req.user, posts : postArr })
    })
    .catch((err) => {
        throw err
    })
  })
  

router.post('/createPost', (req, res) => {
    if(req.user){
        Post.create(req)
        .then((user) => {
            console.log("Info - Post : Create Success");
            console.log("Create User :", user)
            res.redirect('/board')
        })
        .catch((err) => {
            console.log("Error - Post : Create Failed", err)
            res.redirect('/')
        })
    }
})

module.exports = router