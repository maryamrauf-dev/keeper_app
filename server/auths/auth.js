const jwt = require('jsonwebtoken');

const JWT_SECRET = 'super_secret_jwt_key_for_keeper_app';

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { JWT_SECRET, checkAuth };
