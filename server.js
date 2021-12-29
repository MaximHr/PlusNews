const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectDb = require('./db');

connectDb();
app.use(express.static('./frontend'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '/frotnend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})

app.use('/admin', require('./Routes/adminRoute'));
app.use('/article', require('./Routes/articleRoute'));
app.use('/category', require('./Routes/categoryRoute'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})