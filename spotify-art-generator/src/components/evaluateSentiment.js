export default function evaluateSentiment(audioFeatures) {
    const numTracks = audioFeatures.length;
    const totalValence = audioFeatures.reduce((sum, track) => sum + track.valence, 0);
    const totalEnergy = audioFeatures.reduce((sum, track) => sum + track.energy, 0);
    const totalDanceability = audioFeatures.reduce((sum, track) => sum + track.danceability, 0);
  
    const avgValence = totalValence / numTracks;
    const avgEnergy = totalEnergy / numTracks;
    const avgDanceability = totalDanceability / numTracks;
  
    const sentimentScore = (avgValence + avgEnergy + avgDanceability) / 3;
  
    if (sentimentScore >= 0.6) {
      return 'positive';
    } else if (sentimentScore >= 0.4) {
      return 'neutral';
    } else {
      return 'negative';
    }
  }