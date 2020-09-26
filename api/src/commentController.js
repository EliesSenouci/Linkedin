Comment = require('./commentModel');
User = require('./userModel');
Post = require('./postModel');

// GET /post
exports.get = function (req, res) {
    return Comment.find()
        .populate('author')
        .exec((err, posts) => {
            if (err) {
                res.send(err);
            }
            res.json({
                data: posts
            });
        })
};

// GET /post/id
exports.getPost = function(req, res) {
    return Comment.find({"post" : req.params.id})
        .populate('author')
        .exec((err, posts) => {
            if (err) {
                res.send(err);
            }
            res.json({
                data: posts
            });
        })
};

// POST /post
exports.post = function (req, res) {
    // create comment
    let comment = new Comment();
    comment.content = req.body.content;
    comment.author = req.body.author;
    comment.post = req.body.post;

    // update post comments array
    Post.findOne({ _id : comment.post }, function(err, post) {
        if (err) {
            return res.json({status: 500, error: err});
        }
        post.comments.push(comment._id);
        post.save(function(err) {});
    });

    //save comment in comment collection
    comment.save(function (err) {
        if (err) {
            return res.json({status: 500, error: err});
        }
        else {
            res.json({
                message: 'Comment posted',
                data: comment
            });
        }
    });
};

// DELETE /comment/:id
exports.delete = function (req, res) {
    Comment.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Comment deleted'
            });
        }
    });
};

// PUT /comment/:id
exports.update = function (req, res) {
    Comment.findById(req.params.id, function (err, post) {
        if (err) {
            res.send(err);
        }
        else {
            post.content = req.body.content;
            post.save(function (err) {
                if (err) {
                    res.json(err);
                }
                res.json({
                    message: 'post updated',
                    data: post
                });
            });
        }
    });
};