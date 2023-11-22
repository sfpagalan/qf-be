const express = require('express');
const Character = require('../models/Character');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Fetch a character by ID
router.get('/characters/:characterId', characterController.getCharacter);
router.get('/characters', characterController.getCharacter);
router.get('/:characterId', characterController.getCharacter);
router.get('/characters/:name', characterController.getCharacter);

// Create a new character
router.post('/characters', async (req, res) => {
  try {
    const characterData = req.body;
    const newCharacter = new Character(characterData);
    await newCharacter.save();
    res.status(201).json({ _id: newCharacter._id }); // Return only the ID of the new character
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

// Other character routes
router.post('/:characterId/interact', characterController.interactWithCharacter);
router.put('/:characterId', characterController.updateCharacter);

module.exports = router;
