const express = require('express');
const router = express.Router();

const models  = require('../db/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
	models.User.findAll().then((users) => {
   	res.render('users-index', { users: users })
	})
});

router.get('/new', function(req, res, next) {
  res.render('users-new', {})
});

router.post('/', (req,res) => {
	models.User.create(req.body).then((user) => {
		res.redirect('/')
	});
});

module.exports = router;
