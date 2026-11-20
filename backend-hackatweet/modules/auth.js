const User = require('../models/users');

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ result: false, error: 'Token manquant' });
  }

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({ result: false, error: 'Token invalide' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ result: false, error: 'Erreur serveur' });
  }
}

module.exports = { requireAuth };
