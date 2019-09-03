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

router.get('/more/:skip', (req, res) => {
    let skip = parseInt(req.params.skip)
    Post.find({}).sort({writeDate : 'descending'}).skip(skip).limit(4).populate('postComment')
    .then((postArr) => {
        res.json(postArr)
    })
    .catch((err) => {
        throw err
    })
})


router.get('/search', (req, res) => {
    // ? express Query String 
    let search = req.body.search || req.query.search

    Post.find().or([{postTitle : search}, {postContent : search}])
    .sort({writeDate : 'descending'}).limit(4).populate('postComment')
    .then((posts) => {
        res.render('board', { user : req.user, posts : posts })
    })
    .catch((err) => {
        throw err
    })
})

router.get('/myPage', (req, res) => {
    if(req.isAuthenticated()){
        Post.find({ postWriter : req.user.username}).sort({writeDate : 'descending'}).limit(4).populate('postComment')
        .then((postArr) => {
            res.render('myPage', { user : req.user, posts : postArr })
        })
        .catch((err) => {
            throw err
        })
    }else{
        res.redirect('/board')
    }
})

router.get('/hash/:tag', (req, res) => {
    Post.find({'postTags' : req.params.tag })
    .sort({writeDate : 'descending'}).limit(4).populate('postComment')
    .then((postArr) => {
        res.render('myPage', { user : req.user, posts: postArr })
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



// ? Create Comment RT json
router.post('/comment/createComment', (req, res) => {
    if(req.isAuthenticated()){
        let id = req.body.id
        Post.findById(id)
        .then((post) => {
            
            Comment.create(req, id)
            .then((comment) => {
                post.postComment.push(comment._id)

                post.save()
                .then(() => {
                    req.flash("infoDB", "Success Create")
                    res.json(comment)
                })
                .catch((err) => {
                    req.flash("infoDB", "Error User Find : " + err)
                    res.json("")
                })
            })
            .catch((err) => {
                req.flash("infoDB", "Error User Find : " + err)
                console.log("Test Point 3 : Failed Create Comment", err)
                res.json("")
            })
        })
        .catch((err) => {
            req.flash("infoDB", "Error User Find : " + err)
            console.log("Test Point 4 : Failed Create Comment", err)
            res.json("")
        })
    }else{
        console.log("Failed Comment Create")
        res.json("")
    }
})

router.get("/test", (req, res) => {
    Post.find({}).sort({writeDate : 'descending'}).skip(4).limit(4)
    .then((posts) => {
        console.log(posts)
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router