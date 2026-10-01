const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

// load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { checkAuth } = require('./auths/auth');
const { signup, login, logout, verify } = require('./controllers/authController');
const { deleteUser } = require('./controllers/userController');
const { getNotes, createNote, updateNote, deleteNote } = require('./controllers/noteController');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'].filter(Boolean),
  credentials: true 
}));

// connect to MongoDB
mongoose.connect(process.env.MONGOO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Database:', mongoose.connection.name);
  })
  .catch((err) => console.log('DB error:', err));

// auth routes 
app.post('/api/signup', signup);
app.post('/api/login', login);
app.post('/api/logout', logout);
app.delete('/api/user', checkAuth, deleteUser);
app.get('/api/verify', verify);


// notes routes
app.get('/api/notes', checkAuth, getNotes);
app.post('/api/notes', checkAuth, createNote);
app.put('/api/notes/:id', checkAuth, updateNote);
app.delete('/api/notes/:id', checkAuth, deleteNote);

