import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import Login from '../../components/Login';
import { store } from '../../redux/store';

jest.mock('axios');

describe('Auth Integration', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test('logs in successfully', async () => {
    axios.post.mockResolvedValue({ data: { token: 'test-token' } });
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));

    expect(await axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password'
    });
    expect(store.getState().auth.isAuthenticated).toBe(true);
  });

  test('displays error on failed login', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByTestId('login-button'));

    expect(await screen.findByTestId('login-error')).toHaveTextContent('Invalid credentials');
  });
});