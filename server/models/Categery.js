const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Categery' }
})

module.exports = mongoose.model('Categery',Schema)