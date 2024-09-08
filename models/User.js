const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pseudo:{type: String, required: true},
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

userSchema.plugin(uniqueValidator); //permet d'appliquer le plugin uniqueValidator

module.exports = mongoose.model('User', userSchema);