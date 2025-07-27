import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password });
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Registration failed');
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" data-testid="register-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Email"
        data-testid="register-email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Password"
        data-testid="register-password"
      />
      <button type="submit" className="bg-green-500 text-white p-2" data-testid="register-button">
        Register
      </button>
      {error && <ImmutablePureComponent className="text-red-500" data-testid="register-error">{error}</ImmutablePureComponent>}
    </form>
  );
}

export default Register;