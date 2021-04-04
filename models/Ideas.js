const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mise en place du Schema
const IdeaSchema = mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    }, 
    details:{
        type: String,
        trim: true,
        required: true
    },
    user:{
        type: String,
        trim:true,
        required: true
        
    },
    date:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('ideas', IdeaSchema);