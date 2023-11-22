const express = require('express');
const Character = require('../models/Character');
const axios = require('axios');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/:characterId', characterController.getCharacter);
router.post('/', characterController.createCharacter);
router.post('/:characterId/interact', characterController.interactWithCharacter);
router.put('/:characterId', characterController.updateCharacter);

router.post('/characters', async (req, res) => {
  try {
    const characterData = req.body;
    const newCharacter = new Character(characterData);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

module.exports = router;