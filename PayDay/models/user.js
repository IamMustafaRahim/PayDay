const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    uName: {type: String, required: true, minlength: 3, maxlength: 255},
    regDate: {type: Date, default: Date.now },
    fName: {type: String, required: true, minlength: 3, maxlength: 255 },
    lName: {type: String, required: true, minlength: 3, maxlength: 255},
    contact: {type: String, required: true, minlength: 3, maxlength: 255},
    email: {type: String, required: true, minlength: 3, maxlength: 255},
    address: {type: String, required: true, minlength: 3, maxlength: 255},
    gender: {type: String, required: true, enum: ['Male', 'Female', 'Other', 'male', 'female', 'other']},
    age: {type: Number, required: true},
    password: {type: String, required: true, minlength: 6, maxlength: 500}
});

const User = mongoose.model('Users', UserSchema);

function validateUser(user){
    const schema = {
        uName: Joi.string().min(3).required(),
        fName: Joi.string().min(3).required(),
        lName: Joi.string().min(3).required(),
        contact: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        address: Joi.string().min(3).required(),
        gender: Joi.string().min(3).required(),
        age: Joi.number().required(),
        password: Joi.string().min(6).required() 
    };
    
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;