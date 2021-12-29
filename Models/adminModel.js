const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const adminModel = new mongoose.model('Admin', AdminSchema);
module.exports = adminModel;