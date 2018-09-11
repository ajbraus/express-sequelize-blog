var express = require('express');
var router = express.Router();

var models  = require('../db/models');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.Post.findAll().then(posts => {
		res.render('index', { posts: posts, term: "" });	
	});
});

module.exports = router;
