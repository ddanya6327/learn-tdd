const express = require('express');

require('dotenv').config();
const PORT = process.env.SERVER_PORT;

const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zd7sp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
    res.send('main');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
