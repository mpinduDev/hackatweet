const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  content: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
