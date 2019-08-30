const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Post = require('../models/post')
const Comment = require('../models/comment')


router.get('/', (req, res) => {

    Post.find({}).sort({writeDate : 'descending'}).limit(4).populate('postComment')
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
    }else{
        res.redirect('/board')
    }
})

router.post('/comment/createComment/:id', (req, res) => {

    if(req.isAuthenticated()){
        let id = req.params.id
        console.log(id)
        Post.findById(id)
        .then((post) => {
            
            Comment.create(req, id)
            .then((comment) => {
                post.postComment.push(comment._id)

                post.save()
                .then(() => {
                    req.flash("infoDB", "Success Create")
                    console.log("Test Point 1 : Success Create Comment")
                    res.redirect('/board')
                })
                .catch((err) => {
                    req.flash("infoDB", "Error User Find : " + err)
                    console.log("Test Point 2 : Failed Create Comment")
                    res.redirect('/board')
                })
            })
            .catch((err) => {
                req.flash("infoDB", "Error User Find : " + err)
                console.log("Test Point 3 : Failed Create Comment", err)
                res.redirect('/board')
            })
        })
        .catch((err) => {
            req.flash("infoDB", "Error User Find : " + err)
            console.log("Test Point 4 : Failed Create Comment", err)
            res.redirect('/board')
        })
    }
})

module.exports = router