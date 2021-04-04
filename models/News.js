const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mise en place du Schema
const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('news', NewsSchema);