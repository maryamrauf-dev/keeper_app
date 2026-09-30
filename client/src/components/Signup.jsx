import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import api from '../api/axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/signup', { username, email, password });
      
      navigate('/login');
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh', px: { xs: 2, sm: 3 }, py: 4, bgcolor: 'background.default' }}>
      <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, width: '100%', maxWidth: 420, border: '1px solid', borderColor: 'divider', borderTop: '4px solid', borderTopColor: 'primary.main', boxShadow: '0 16px 48px rgba(32, 40, 32, 0.08)' }}>
        <Typography variant="h4" mb={1} sx={{ textAlign: 'center' }}>Notes Keeper</Typography>
        <Typography color="text.secondary" mb={3} sx={{ textAlign: 'center' }}>Create your account</Typography>
        <form onSubmit={handleSignup}>
          <TextField fullWidth required label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField fullWidth required type="email" label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth required label="Password" type="password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
        </form>
        <Typography color="text.secondary" variant="body2" sx={{ textAlign: 'center' }}>
          Already have an account? <Link style={{ color: '#765700', fontWeight: 600 }} to="/login">Log in</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
