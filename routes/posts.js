var express = require('express');
var router = express.Router({mergeParams: true});

var models  = require('../db/models');


router.get('/search', function(req, res, next) {
    models.Post.findAll({
        where: { 
            title: {
                $like: "%" + req.query.term + "%"
            }
        }
    }).then((posts) => {
        res.render('index', { posts: posts, term: req.query.term })
    })
});

router.get('/new', function(req, res, next) {
   	res.render('posts-new', {})
});

router.get('/:id', function(req, res, next) {
    models.Post.findById(req.params.id).then(post => {
        post.getComments().then(comments => {
            res.render('posts-show', {post: post, comments: comments})
        });
    });
});

router.post('/', (req,res) => {
	models.Post.create(req.body).then(post => {
		res.redirect('/')
	});
});

module.exports = router;
