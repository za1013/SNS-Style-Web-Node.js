const express = require('express')
const router = express.Router()

const Post = require('../models/post')


router.get('/', (req, res) => {
    res.render('board', { user : req.user })
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