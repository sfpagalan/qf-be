const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    nextStoryPart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }
});

module.exports = mongoose.model('Option', optionSchema);
