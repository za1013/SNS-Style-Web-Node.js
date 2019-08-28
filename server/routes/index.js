var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/board', (req, res) => {
  res.render('board')
})

router.get('/temp', (req, res) => {
  res.render("temp")
})

router.post("/signIn", (req, res) => {
  // ! 2019.08.28 EjS View OK! PASSPORT Connect Please
  res.redirect('/board')
})

router.post("/signUp", (req, res) => {
  // ! 2019.08.28 EjS View OK! PASSPORT Connect Please
  res.redirect('/board')
})


module.exports = router;
