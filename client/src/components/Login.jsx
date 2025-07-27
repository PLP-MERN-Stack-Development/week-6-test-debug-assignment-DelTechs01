import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      dispatch(login(response.data.token));
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" data-testid="login-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Email"
        data-testid="login-email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Password"
        data-testid="login-password"
      />
      <button type="submit" className="bg-blue-500 text-white p-2" data-testid="login-button">
        Login
      </button>
      {error && <p className="text-red-500" data-testid="login-error">{error}</p>}
    </form>
  );
}

export default Login;