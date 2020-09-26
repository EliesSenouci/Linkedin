Post = require('./postModel');
User = require('./userModel');

// GET /post
exports.get = function (req, res) {
    return Post.find()
        .populate('author')
        .populate('comments')
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
exports.newpost = function (req, res) {
    // create post data
    let post = new Post();
    post.content = req.body.content;
    post.author = req.body.author;

    // update user posts array
    User.findOne({ _id : post.author }, function(err, user) {
        if (err) {
            return res.json({status: 500, error: err});
        }
        user.posts.push(post._id);
        user.save(function(err) {});
    });

    //save post in post collection
    post.save(function (err) {
        if (err) {
            return res.json({status: 500, error: err});
        }
        else {
            res.json({
                message: 'New post created!',
                data: post
            });
        }
    });
};

// DELETE /post/id
exports.delete = function (req, res) {
    Post.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Post deleted'
            });
        }
    });
};

// PUT /post/:id
exports.update = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
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
