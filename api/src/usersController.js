User = require('./userModel');
Establishment = require('./establishmentModel');

// POST /users/login
exports.login = function (req, res) {
    return User.findOne({email: req.body.email, password: req.body.password})
        .populate('establishments')
        .exec((err, posts) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'User details loading..',
                    data: posts,
                    token: "1234"
                });
            }
        });
};

// GET /users
exports.index = function (req, res) {
    return User.find()
        .populate('posts')
        .populate('establishments')
        .exec((err, posts) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json({
                    message: 'User details loading..',
                    data: posts
                });
            }
        })
};

// GET /users/:id
exports.view = function (req, res) {
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                message: 'User details loading..',
                data: user
            });
        }
    }).populate('establishments').populate('relations');
};

// GET /users/relations/:id
exports.relations = function (req, res) {
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                message: 'Success',
                data: user
            });
        }
    }).populate({
        path: 'relations',
        populate: {
            path: 'posts',
            populate:
                [{path: 'comments'},
                {path: 'author'}]
        }
    }).populate({
        path: 'posts',
        populate:
            [{path: 'comments'},
                {path: 'author'}]
    });
};

// POST /users
exports.new = function (req, res) {
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = req.body.password;
    user.email = req.body.email;
    user.title = req.body.title;
    user.bio = req.body.bio;
    user.city = req.body.city;
    user.save(function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                message: 'New user created!',
                data: user
            });
        }
    });
};

// PUT /users/:id
exports.update = function (req, res) {
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            try {
                user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
                user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
                user.password = req.body.password ? req.body.password : user.password;
                user.email = req.body.email ? req.body.email : user.email;
                user.title = req.body.title ? req.body.title : user.title;
                user.bio = req.body.bio ? req.body.bio : user.bio;
                user.city = req.body.city ? req.body.city : user.city;
                user.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'User Info updated',
                        data: user
                    });
                });
            }
            catch (e) {
                res.json(e);
            }
        }
    });
};

// PUT /users/ban/:id
exports.ban = function (req, res) {
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            try {
                user.is_banned = !user.is_banned;
                user.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'Success',
                        data: user
                    });
                });
            }
            catch (e) {
                res.json(e);
            }
        }
    });
};

// DELETE /users/:id
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.userID
    }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'User deleted'
            });
        }
    });
};

// PUT /users/subscribe/:id
exports.subscribe = function (req, res) {
    return User.findOne({_id: req.params.userID})
        .populate('establishments')
        .exec((err, user) => {
            if (err) {
                res.send(err);
            } else {
                try {
                    user.establishments.push(req.body.id);
                    user.save(function (err) {
                        if (err) {
                            res.json(err);
                        }
                        res.json({
                            message: 'Success',
                            data: user
                        });
                    });
                }
                catch (e) {
                    res.json(e)
                }
            }
        });
};

// PUT /users/unsubscribe/:id
exports.unsubscribe = function (req, res) {
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            res.send(err);
        }
        else {
            try {
                const index = user.establishments.indexOf(req.body.id);
                if (index > -1) {
                    user.establishments.splice(index, 1);
                }
                user.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'Success',
                        data: user
                    });
                });
            }
            catch (e) {
                res.json(e);
            }
        }
    })
};

// PUT /users/follow/:id
exports.follow = function (req, res) {
    return User.findOne({_id: req.params.userID})
        .exec((err, user) => {
            if (err) {
                res.send(err);
            } else {
                try {
                    user.relations.push(req.body.id);
                    user.save(function (err) {
                        if (err) {
                            res.json(err);
                        }
                        res.json({
                            message: 'Success'
                        });
                    });
                }
                catch (e) {
                    res.json(e)
                }
            }
        });
};

// PUT /users/unsubscribe/:id
exports.unfollow = function (req, res) {
    return User.findOne({_id: req.params.userID})
        .exec((err, user) => {
            if (err) {
                res.send(err);
            } else {
                try {
                    const index = user.relations.indexOf(req.body.id);
                    if (index > -1) {
                        user.relations.splice(index, 1);
                    }                    user.save(function (err) {
                        if (err) {
                            res.json(err);
                        }
                        res.json({
                            message: 'Success'
                        });
                    });
                }
                catch (e) {
                    res.json(e)
                }
            }
        });
};
