const express = require('express');
const router = express.Router({mergeParams: true});
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const models  = require('../db/models');

router.get('/search', (req, res, next) => {
    models.Post.findAll({
        where: {
            title: {
                [op.like]: `%${req.query.term}%`
            }
        }
    }).then((posts) => {
        res.render('index', { posts: posts, term: req.query.term })
    });
});

router.get('/new', function(req, res, next) {
   	res.render('posts-new', {})
});

// SHOW
router.get('/:id', function(req, res, next) {
    models.Post.findById(req.params.id).then(post => {
        post.getComments({ order: [['createdAt', 'DESC']] }).then(comments => {
            res.render('posts-show', { post: post, comments: comments})
        });
    });
});

router.post('/', (req,res) => {
  console.log(req.body);
	models.Post.create(req.body).then(post => {
		res.redirect('/')
	});
});

module.exports = router;
