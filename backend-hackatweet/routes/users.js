const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', async (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    return res
      .status(400)
      .json({ result: false, error: 'Champs manquants ou vides' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({
      result: false,
      error: 'Le mot de passe doit contenir au moins 6 caractères',
    });
  }

  try {
    const username = req.body.username.trim();
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ result: false, error: "Ce nom d'utilisateur est déjà pris" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      firstname: req.body.firstname.trim(),
      username,
      password: hash,
      token: crypto.randomBytes(32).toString('hex'),
    });
    const savedUser = await newUser.save();

    res.json({
      result: true,
      user: {
        firstname: savedUser.firstname,
        username: savedUser.username,
        token: savedUser.token,
      },
    });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

router.post('/signin', async (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    return res
      .status(400)
      .json({ result: false, error: 'Champs manquants ou vides' });
  }

  try {
    const user = await User.findOne({ username: req.body.username.trim() });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({
        result: false,
        error: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    res.json({
      result: true,
      user: {
        firstname: user.firstname,
        username: user.username,
        token: user.token,
      },
    });
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
});

module.exports = router;
