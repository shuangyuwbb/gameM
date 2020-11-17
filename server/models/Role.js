const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})
module.exports = mongoose.model('Role', Schema)