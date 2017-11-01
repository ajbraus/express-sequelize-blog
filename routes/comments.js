var express = require('express');
var router = express.Router({mergeParams: true});

var models  = require('../db/models');

router.post('/', (req,res) => {
    req.body.PostId = req.params.id;
    
    models.Comment.create(req.body).then((comment) => {
        res.redirect('/posts/' + req.params.id)
    });
});

module.exports = router;
