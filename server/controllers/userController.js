const User = require('../models/User');
const Note = require('../models/Note');

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.userId);
  await Note.deleteMany({ userId: req.userId });
  res.clearCookie('token');
  console.log('User deleted account, ID:', req.userId);
  res.json({ message: 'User deleted' });
};

module.exports = { deleteUser };
