const Character = require('../models/Character');
const axios = require('axios');

// Retrieve a character by ID
const getCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.characterId);
        if (!character) {
            return res.status(404).send('Character not found');
        }
        res.json(character);
    } catch (error) {
        console.error('Error fetching character:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new character
const createCharacter = async (req, res) => {
    try {
      const character = new Character(req.body);
      await character.save();
      res.status(201).json(character);
    } catch (error) {
      console.error('Error creating character:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Update a character by ID
const updateCharacter = async (req, res) => {
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(
            req.params.characterId,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedCharacter) {
            return res.status(404).send('Character not found');
        }
        res.json(updatedCharacter);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const interactWithCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.characterId);
        if (!character) {
            return res.status(404).send('Character not found');
        }

        const userChoice = req.body.userChoice; // Ensure the userChoice is passed in the request body

        const openAiPayload = {
            prompt: `Continue the following story based on the user's choice:\n\nStory so far: ${character.currentStory}\nUser's choice: ${userChoice}\n\n`,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stop: ['\n']
        };

        const openAiResponse = await axios.post(process.env.OPENAI_URL, openAiPayload, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        if (openAiResponse.data && openAiResponse.data.choices) {
            const storyContinuation = openAiResponse.data.choices[0].text.trim();

            character.currentStory += `\n\n${storyContinuation}`;
            await character.save();

            res.send({ updatedStory: character.currentStory });
        } else {
            throw new Error('Invalid response structure from OpenAI');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getCharacter,
    createCharacter,
    updateCharacter,
    interactWithCharacter
};
