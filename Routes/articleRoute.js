const express = require('express');
const router = express.Router();
const Article = require('../Models/TextModel');

router.post('/post', async(req, res) => {
    try {
        const newArticle = new Article({
            title: req.body.title,
            text: req.body.text,
            category: req.body.category,
            author: req.body.author,
            articleImage: req.body.articleImage,
            adminName: req.body.adminName,
            views: 0
        })
        await newArticle.save();
        res.send(newArticle);

    }catch(err) {
        console.error(err);
    }
});

router.get('/get/byId/:id', async(req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.send(article);
    }catch(err) {
        res.status(400).send('Can not find article')
    }
});
router.get('/get/byCategory/:category', async(req, res) => {
    try {
        const articles = await Article.find({category: { $regex : new RegExp(req.params.category, "i") }}).sort({_id: -1})
        res.send(articles);
    }catch(err) {
        res.status(400).send('Can not find articles with that category')
    }
});
router.get('/get/recent/', async(req, res) => {
    try {
        const articles = await Article.find().sort({_id: -1});
        res.send(articles);
    }catch(err) {
        res.status(400).send('Can not find articles with that category');
    }
});
router.get('/get/byAdmin/:admin', async(req, res) => {
    try {
        const articles = await Article.find({adminName: req.params.admin}).sort({_id: -1});
        res.send(articles);
    }catch(err) {
        res.status(400).send('Can not find articles from this author.')
    }
});

router.put('/newViewer/:id', async(req, res) => {
    let article = await Article.findById(req.params.id);
    article.views += 1;
    await article.save();
    res.send('New Visitor');

})
router.put('/update/:id', async(req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        article.title = req.body.title;
        article.text =  req.body.text,
        article.category = req.body.category,
        article.author = req.body.author,
        article.articleImage = req.body.articleImage,
        article.adminName = req.body.adminName
        await article.save();
        res.send(article)
        
    }catch(err) {
        console.log(err);
        res.status(400).send('Can not update this article');
    }
});
router.get('/get/search/:title', async(req, res) => {
    try {
        let articles = await Article.find({title: { '$regex': req.params.title, $options: 'i'}}).sort({_id: -1});
        res.send(articles);
    }catch(err) {
        res.status(400).send('Can not find this article');
    }
})

router.get('/get/searchByCategory/:title/:category', async(req, res) => {
    try {
        let articles = await Article.find({
            title: { '$regex': req.params.title, $options: 'i'},
            category: { $regex : new RegExp(req.params.category, "i") }
        }).sort({_id: -1});
        res.send(articles);
    }catch(err) {
        res.status(400).send('Can not find this article');
    }
})

router.delete('/delete/:id', async(req, res) => {
    try { 
        const article = await Article.findByIdAndDelete(req.params.id);
        res.send(article);
    } catch(err) {
        console.log(err);
        res.status(400).send('Can not delete this article');
    }

});


module.exports = router;