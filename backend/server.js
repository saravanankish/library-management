// imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//variables
const port = process.env.PORT || 9000;


app.get('/', (req, res) => {
    res.status(200).send("Working!!");
})

app.listen(port, () => {
    console.log(`Listening to localhost:${port}`);
})