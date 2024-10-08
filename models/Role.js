const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roleSchema = mongoose.Schema({
    name : {type: String, required: true, unique: true},
})

module.exports = mongoose.model('Role', roleSchema);