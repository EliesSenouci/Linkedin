const mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
});

// Export Comment model
let Comment = module.exports = mongoose.model('comment', commentSchema);
module.exports.get = function (callback, limit) {
    Comment.find(callback).limit(limit);
};