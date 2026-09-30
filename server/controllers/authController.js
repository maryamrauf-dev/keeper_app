const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../auths/auth');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  console.log('New user saved to database:', newUser.email);

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  res.cookie('token', token);
  res.json({ message: 'Signed up!' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.cookie('token', token);
  console.log('User logged in:', user.email);
  res.json({ message: 'Logged in!' });
};

const logout = (req, res) => {
  res.clearCookie('token');
  console.log('User logged out');
  res.json({ message: 'Logged out' });
};

const verify = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.json({ loggedIn: false });
    res.json({ loggedIn: true, userId: decoded.userId, username: user.username });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};

module.exports = { signup, login, logout, verify };
