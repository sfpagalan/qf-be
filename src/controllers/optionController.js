// const Story = require('../models/Story');

// const getOptions = async (req, res) => {
//     try {
//         const story = await Story.findById(req.params.storyId);
//         if (!story) {
//             return res.status(404).send('Story not found');
//         }
//         res.send(story.options);
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// };

// const updateOptions = async (req, res) => {
//     try {
//         const story = await Story.findByIdAndUpdate(
//             req.params.storyId, 
//             { $set: { options: req.body.options } }, 
//             { new: true }
//         );
//         if (!story) {
//             return res.status(404).send('Story not found');
//         }
//         res.send(story.options);
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// };

// module.exports = {
//     getOptions,
//     updateOptions
// };
