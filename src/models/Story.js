const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: String,
    currentStory: String,
});

module.exports = mongoose.model('Story', storySchema);
