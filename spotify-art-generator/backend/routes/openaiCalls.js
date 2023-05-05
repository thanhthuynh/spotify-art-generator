const express = require('express');
const router = express.Router();
const openai = require('../openAI'); // Import the openAI instance

router.post('/generateImage', async (req, res) => {
    try {
      const { mood, sentiment } = req.body;
  
      const prompt = `Create an image that visually embodies and expresses a range of emotions, \
              capturing the essence of ${mood} ${sentiment}. The image should evoke a \
              specific emotion or mood, seamlessly aligning with the theme and atmosphere of the corresponding \
              playlist. Use vivid colors, imaginative designs, and evocative patterns to create an immersive \
              visual experience that resonates with the listener and enhances their connection with the music.`;
  
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512',
      });
  
      res.json(response.data.data[0]);
    } catch (error) {
      console.error('Error generating image:', error.message);
      res.status(500).json({ message: 'Error generating image' });
    }
  });  

module.exports = router;
