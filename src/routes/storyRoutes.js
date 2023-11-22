const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

router.get('/:storyId', storyController.getStory);
router.put('/:storyId', storyController.updateStory);
router.post('/', storyController.continueStory);
router.post('/:storyId/makeChoice', storyController.makeChoice);

router.post('/story', async (req, res) => {
    try {
        const storyData = req.body;
        const newStory = new Story(storyData);
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        console.error('Error creating story:', error);
        res.status(500).json({ error: 'Failed to create story' });
    }
    });

router.post('/continue', async (req, res) => {
    try {
    const storyData = req.body;
    const newStory = new Story(storyData);
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ error: 'Failed to create story' });
  }
});

module.exports = router;