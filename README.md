# Spotify AI Playlist Art Generator

A web application that integrates your Spotify playlists with dynamic, sentiment-based artwork creation. Utilizing the FERN tech stack (Firebase, Express.js, React, Node.js) and leveraging the Spotify and OpenAI APIs, this app offers a unique experience where each playlist's mood is analyzed and visually represented through custom-generated artwork.


### Key Features:
Spotify Integration: Connect your Spotify account to access playlists.
Sentiment Analysis: Uses OpenAI's API to analyze the mood of each playlist.
Artwork Generation: Automatically creates unique artwork for playlists based on their sentiment.


### Technologies Used:
Frontend: React
Backend: Node.js, Express.js
Database: Firebase
APIs: Spotify for playlist data, OpenAI for sentiment analysis


### How It Works
Step 1: User logs in using their Spotify credentials.
Step 2: The app fetches playlist data from Spotify.
Step 3: OpenAI's API performs sentiment analysis on the tracks.
Step 4: Based on this analysis, the app generates a unique playlist cover.


### Security
OAuth 2.0 for secure Spotify authentication.
Data encryption for sensitive information storage.


### License
This project is licensed under the MIT License - see the LICENSE.md file for details.


### Acknowledgments
Spotify API for providing a rich set of music data and audio features
OpenAI for their state-of-the-art language and image generation models (DALL-E)

### Video Demo
https://youtu.be/LMNhDAY94AQ?si=EjmSN9z2syx1wTZX
