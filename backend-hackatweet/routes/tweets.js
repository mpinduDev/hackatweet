const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tweet = require('../models/tweets');
const { checkBody } = require('../modules/checkBody');
const { requireAuth } = require('../modules/auth');

const POPULATE = [
  { path: 'author', select: 'firstname username' },
  { path: 'likes', select: 'username' },
];

function formatTweet(tweet) {
  return {
    id: tweet._id,
    author: {
      firstname: tweet.author.firstname,
      username: tweet.author.username,
    },
    content: tweet.content,
    createdAt: tweet.createdAt.getTime(),
    likes: tweet.likes.map((user) => user.username),
  };
}

router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate(POPULATE);
    res.json({ result: true, tweets: tweets.map(formatTweet) });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  if (!checkBody(req.body, ['content'])) {
    return res.status(400).json({ result: false, error: 'Le tweet est vide' });
  }
  const content = req.body.content.trim();
  if (content.length > 280) {
    return res
      .status(400)
      .json({ result: false, error: 'Le tweet dépasse 280 caractères' });
  }

  try {
    const newTweet = new Tweet({ author: req.user._id, content });
    await newTweet.save();
    await newTweet.populate(POPULATE);
    res.json({ result: true, tweet: formatTweet(newTweet) });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

router.put('/:id/like', requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ result: false, error: 'Tweet introuvable' });
  }

  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res
        .status(404)
        .json({ result: false, error: 'Tweet introuvable' });
    }

    const alreadyLiked = tweet.likes.some((id) => id.equals(req.user._id));
    if (alreadyLiked) {
      tweet.likes.pull(req.user._id);
    } else {
      tweet.likes.push(req.user._id);
    }
    await tweet.save();
    await tweet.populate(POPULATE);

    res.json({ result: true, tweet: formatTweet(tweet) });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ result: false, error: 'Tweet introuvable' });
  }

  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res
        .status(404)
        .json({ result: false, error: 'Tweet introuvable' });
    }
    if (!tweet.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({
          result: false,
          error: 'Vous ne pouvez supprimer que vos tweets',
        });
    }

    await Tweet.deleteOne({ _id: tweet._id });
    res.json({ result: true });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

module.exports = router;
