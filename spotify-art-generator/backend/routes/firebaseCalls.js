const express = require('express');
const router = express.Router();
const database = require('../firebase');

const saveGeneratedImage = async (userId, playlistId, imageData) => {
  try {
    await database.ref(`users/spotify:${userId}/playlists/${playlistId}`).push(imageData);
  } catch (error) {
    console.error('Error saving generated image:', error);
  }
};

const getGeneratedImagesForPlaylist = async (userId, playlistId) => {
  try {
    const snapshot = await database.ref(`users/spotify:${userId}/playlists/${playlistId}`).once('value');
    const imagesData = snapshot.val();
    if (imagesData) {
      // Convert the images data object into an array
      return Object.entries(imagesData).map(([key, value]) => ({ ...value, id: key }));
    }
    return [];
  } catch (error) {
    console.error('Error retrieving generated images:', error);
    return [];
  }
};

router.post('/saveImage', async (req, res) => {
  const { userId, playlistId, imageUrl } = req.body;
  try {
    await saveGeneratedImage(userId, playlistId, { imageUrl });
    res.status(200).json({ message: 'Image saved successfully.' });
  } catch (error) {
    console.error('Error saving generated image:', error);
    res.status(500).json({ error: 'Error saving generated image.' });
  }
});

router.get('/getImagesForPlaylist/:playlistId/:userId', async (req, res) => {
  const { userId, playlistId } = req.params;
  try {
    const images = await getGeneratedImagesForPlaylist(userId, playlistId);
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error retrieving generated images:', error);
    res.status(500).json({ error: 'Error retrieving generated images.' });
  }
});

module.exports = router;
