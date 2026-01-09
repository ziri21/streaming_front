const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },          // vidéo complète (lecture principale)
  thumbnail: { type: String, required: false },   // image d'affiche du film
  previewUrl: { type: String, required: false },  // courte vidéo de bande-annonce (optionnel)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Video', videoSchema);
