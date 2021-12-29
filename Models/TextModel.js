const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    articleImage: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    adminName: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: false,
        default: 0
    }
})

const articleModel = new mongoose.model('Article', ArticleSchema);
module.exports = articleModel;