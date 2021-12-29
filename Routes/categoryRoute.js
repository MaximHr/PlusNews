const express = require('express');
const router = express.Router();
const Category = require('../Models/categoryModel');

//TODO

router.get('/get', async(req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);

    }catch(err) {
        res.status(400).send(err);
    }
});
router.post('/post', async(req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name
        })
        await newCategory.save();
        res.send(newCategory);

    }catch(err) {
        res.status(400).send(err);
    }
});
router.delete('/delete/:id', async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.send(category);

    }catch(err) {
        res.status(400).send(err);
    }
})

module.exports = router;