const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const favoriteSchema = mongoose.Schema({
    omdbId : {type: String},
    userId : {type: String},
    omdbTitle: {type: String}
})

module.exports = mongoose.model('Favorite', favoriteSchema);