const {User, validateUser} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/',(req,res) => {
    res.send("Welcome");
})


router.get('/u', async (req,res) => {
    try{
    const users = await User.find();
        res.send(users);
    }catch(e){
        console.log(e.message);
    }   
})


router.get('/u/:uname', async (req,res) => {
    try{
    const users = await User.find({ uName: req.params.uname});
        res.send(users);
    }catch(e){
        console.log(e.message);
    }
})


router.post('/addingUser',async (req,res) => {
    try{
    const { error } = validateUser(req.body);     
        if(error){
            res.status(400).send(error.details[0].message);
        }
    const user = new User({
        uName: req.body.uName,
        regDate: new Date,
        fName: req.body.fName,
        lName: req.body.lName,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password
    })
    const result = await user.save();
    console.log(result);
    res.send(result);
}catch(e){
    console.log(e.message);
}
    
})


router.put('/u/update/:uid',async (req,res) => {
    try{
    const { error } = validateUser(req.body);     
        if(error){
            res.status(400).send(error.details[0].message);
        }
    const user = await User.findById(req.params.uid);
    if(!user) return;
    user.set({
        uName: req.body.uName,
        regDate: new Date,
        fName: req.body.fName,
        lName: req.body.lName,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password
    })

    const newUser = await user.save();
    res.send(newUser);
}catch(e){
    console.log(e.message);
}
})


router.delete('/u/del/:uid', async (req,res) => {
    try{
    const result = await User.findByIdAndDelete(req.params.uid);
    res.send(result);
    }catch(e){
        console.log(e.message);
    }
})

module.exports = router;