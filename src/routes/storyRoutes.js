const express = require('express');
const router = express.Router();
const {
    getStory,
    updateStory,
    makeChoice,
    continueStory,
  } = require('../controllers/storyController');

router.get('/:storyId', getStory);
router.put('/:storyId', updateStory);
router.post('/:storyId/choose', makeChoice);
router.post('/:storyId/continue', continueStory);

// router.post('continue', async (req, res) => {
//     try {
//     const storyData = req.body;
//     const newStory = new Story(storyData);
//     await newStory.save();
//     res.status(201).json(newStory);
//   } catch (error) {
//     console.error('Error creating story:', error);
//     res.status(500).json({ error: 'Failed to create story' });
//   }
// });

module.exports = router;