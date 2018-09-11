var express = require('express');
var router = express.Router({mergeParams: true});

var models  = require('../db/models');

router.post('/', (req,res) => {
    req.body.PostId = req.params.postId;
    console.log(req.body)
    
    models.Comment.create(req.body)
        .then(comment => {
            res.redirect('/posts/' + req.params.postId)
        })
        .catch(err => {
            return console.log(err);
        })
});

module.exports = router;
