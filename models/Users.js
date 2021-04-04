const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mise en place du Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);