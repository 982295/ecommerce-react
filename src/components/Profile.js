import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import useStyles from './loginStyle'; // Ensure you have your custom styles
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = ({ setIsAuthenticated }) => {
    const { login } = useAuth();
    const navigate = useNavigate()
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/cart';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result) {
        login(); // Update authentication state
        navigate(from, { replace: true });
        setSuccess(true);
      } else {
        setError('username or password is incorrect');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" component="h1" align="center">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <SnackbarContent
            style={{ backgroundColor: 'red' }}
            message={error}
          />
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <SnackbarContent
            style={{ backgroundColor: 'green' }}
            message="Login successful!"
          />
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Profile;
