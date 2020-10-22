const express = require('express');
const router = express.Router({mergeParams: true});
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const models  = require('../db/models');

// INDEX
router.post('/', (req,res) => {
  console.log(req.body);
	models.Post.create(req.body).then(post => {
		res.redirect('/')
	});
});

// NEW
router.get('/new', function(req, res, next) {
   	res.render('posts-new', {})
});

// CREATE

// SHOW
router.get('/:id', function(req, res, next) {
    models.Post.findById(req.params.id).then(post => {
        post.getComments({ order: [['createdAt', 'DESC']] }).then(comments => {
            res.render('posts-show', { post: post, comments: comments})
        });
    });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
    models.Post.findById(req.params.id).then(post => {
        res.render('posts-edit', { post })
    });
});


// UPDATE

router.put('/:id', function(req, res, next) {
    models.Post.findById(req.params.id).then(post => {
        post.update(req.body).then(post => {
            res.redirect(`/posts/${post.id}`); // => SHOW
        })
    })
    .catch(err => {
        reqconsole.log(err);
    })
});

// DESTROY

router.delete('/:id', function(req, res, next) {
    // models.Post.findById(req.params.id).then(post => {
    //     post.getComments({ order: [['createdAt', 'DESC']] }).then(comments => {
    //         res.render('posts-show', { post: post, comments: comments})
    //     });
    // });
});


// SEARCH
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



module.exports = router;
