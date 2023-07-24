const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

