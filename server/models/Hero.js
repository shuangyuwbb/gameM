const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    title: {type: String},
    categeries: [{type: mongoose.Types.ObjectId, ref: 'Categery'}],
    scores: {
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number},
    },
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String},
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usage_tips: {type: String},
    battle_tips: {type: String},
    team_tips: {type: String},
    partners: [{
        hero: {type: mongoose.SchemaTypes.ObjectId, ref : 'Hero'},
        description: {type: String}
    }]

})

module.exports = mongoose.model('Hero',heroSchema)