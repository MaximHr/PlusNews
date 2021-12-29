const express= require('express');
const router = express.Router();
const Admin = require('../Models/adminModel');

router.post('/logIn', async(req, res) => {
    try {
        const existingAdmin = await Admin.findOne({name: req.body.name, password: req.body.password});
        if(existingAdmin){
            return res.send(existingAdmin);
        }
        return res.status(400).send('Invalid Credentials');
        

    }catch(err) {
        console.error(err);
    }
})

module.exports = router;