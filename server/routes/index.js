const express = require('express');
const passport = require('passport')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  console.log(req.isAuthenticated())
  res.render('index', { title: 'Express' });
});

router.get('/temp', (req, res) => {
  res.render("temp")
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/board',
  failureRedirect : '/board'
}))



router.post('/register', passport.authenticate('local-register', {
  successRedirect : '/board',
  failureRedirect : '/board',
}))

router.get('/logout', (req, res) => {
  if(req.isAuthenticated()){
    req.logout()
  }
  res.redirect('/board')
})


module.exports = router;
