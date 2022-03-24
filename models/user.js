const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: String,
    password: String,
    score: String
});

module.exports = mongoose.model('User', User);