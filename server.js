const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDb = require('./db');

connectDb();
app.use(express.static('../web'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/admin', require('./Routes/adminRoute'));
app.use('/article', require('./Routes/articleRoute'));
app.use('/category', require('./Routes/categoryRoute'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})