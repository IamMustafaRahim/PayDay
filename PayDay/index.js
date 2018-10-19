const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const users = require('./routes/users');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', users);

mongoose.connect('mongodb://localhost/PayDay').then(() => {
    console.log('connected to mongoDB..');
}).catch(err => {
    console.log('could no connected to mongoDB...',err);
});

const port = process.env.PORT;
app.listen(port,()=>{
    console.log('server started on port ', port);
})

