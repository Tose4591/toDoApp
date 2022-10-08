const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const Notes = mongoose.model('Notes', noteSchema);

module.exports = Notes;