let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },   
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    is_banned: {
        type: Boolean,
        default: false,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    establishments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'establishment'
    }],
    relations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

// Export User model
let User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};