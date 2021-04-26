const mongoose = require('mongoose');


//Mise en place du Schema
const IdeaSchema = new mongoose.Schema({
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
    },
    picture: {
        type:String,
        trim:true
    }

});

mongoose.model('ideas', IdeaSchema);