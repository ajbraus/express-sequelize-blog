const express = require('express');
const router = express.Router();

const models  = require('../db/models');

/* GET home page. */
router.get('/', (req, res, next) => {
	models.Post.findAll().then(posts => {
		res.render('index', { posts: posts, term: "" });
	});
});

/* GET Login. */
router.get('/login', (req, res, next) => {
	res.render('login');
});

/* POST Login. */
router.post('/login', (req, res, next) => {
	models.Post.findAll().then(posts => {
		res.render('index', { posts: posts, term: "" });
	});
});

module.exports = router;
