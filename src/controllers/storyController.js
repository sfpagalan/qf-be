const Story = require('../models/Story'); // Assuming you have a Story model

const getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).send('Story not found');
        }
        res.send(story);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndUpdate(req.params.storyId, req.body, { new: true });
        if (!story) {
            return res.status(404).send('Story not found');
        }
        res.send(story);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const makeChoice = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).send('Story not found');
        }

        const userChoice = req.body.userChoice; // Ensure the userChoice is passed in the request body

        const openAiPayload = {
            prompt: `Continue the following story based on the user's choice:\n\nStory so far: ${story.currentStory}\nUser's choice: ${userChoice}\n\n`,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stop: ['\n', '##']
        };

        const openAiResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', openAiPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const newStory = openAiResponse.data.choices[0].text;

        // Update the story in the database
        const updatedStory = await Story.findByIdAndUpdate(
            req.params.storyId,
            { $set: { currentStory: newStory } },
            { new: true }
        );

        res.json(updatedStory);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const continueStory = async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.storyId });
        if (!story) {
            return res.status(404).send('Story not found');
        }

        const userChoice = req.body.userChoice; // Ensure the userChoice is passed in the request body

        const openAiPayload = {
            prompt: `Continue the following story based on the user's choice:\n\nStory so far: ${story.currentStory}\nUser's choice: ${userChoice}\n\n`,
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
            stop: ['\n', '##']
        };

        const openAiResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', openAiPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const newStory = openAiResponse.data.choices[0].text;

        // Update the story in the database
        const updatedStory = await Story.findByIdAndUpdate(
            req.params.storyId,
            { $set: { currentStory: newStory } },
            { new: true }
        );

        res.json(updatedStory);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getStory,
    updateStory,
    makeChoice,
    continueStory
};
