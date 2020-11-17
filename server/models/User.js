const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    },
    email: {
        type: String
    },
    sex: {
        type: String
    },
    role: {
        hero: {type: mongoose.SchemaTypes.ObjectId, ref : 'Role'},
       
    },
    avatar: {
        type: String

    }
   
})
module.exports = mongoose.model('User',userSchema)