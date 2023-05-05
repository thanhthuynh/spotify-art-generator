require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;

//Routes
const spotifyCalls = require('./routes/spotifyCalls');
const firebaseCalls = require('./routes/firebaseCalls');
const openaiCalls = require('./routes/openaiCalls');

//middleware
app.use('/api/spotify', spotifyCalls);
app.use('/api/firebase', firebaseCalls);
app.use('/api/openai', openaiCalls);

app.post('/api/authenticate', async (req, res) => {
    try {
      const accessToken = req.body.accessToken;
  
      // Fetch the user's Spotify profile
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const spotifyUser = response.data;
      const firebaseUid = `spotify:${spotifyUser.id}`;
  
      // Create or update the user in Firebase
      await admin.auth().updateUser(firebaseUid, {
        displayName: spotifyUser.display_name,
      }).catch(async (error) => {
        if (error.code === 'auth/user-not-found') {
          await admin.auth().createUser({
            uid: firebaseUid,
            displayName: spotifyUser.display_name,
          });
        } else {
            console.log(err);
            res.sendStatus(400);
        }
      });
  
      // Generate the custom token
      const customToken = await admin.auth().createCustomToken(firebaseUid);

      res.json({ firebaseToken: customToken, spotifyUserId: spotifyUser.id });
    } catch (error) {
      console.error('Error generating custom token:', error);
      res.status(500).send('Error generating custom token');
    }
  });

  app.listen(8000, () => console.log('Server listening on port 8000'));