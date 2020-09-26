const mongoose = require('mongoose');

let postSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

// Export Post model
let Post = module.exports = mongoose.model('post', postSchema);
module.exports.get = function (callback, limit) {
    Post.find(callback).limit(limit);
};