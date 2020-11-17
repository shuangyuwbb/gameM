const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    categeries: [{type: mongoose.Types.ObjectId, ref: 'Categery'}],
    
})

module.exports = mongoose.model('Article',Schema)