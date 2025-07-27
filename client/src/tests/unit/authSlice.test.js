import authReducer, { login, logout } from '../../redux/authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null
  };

  test('should handle login', () => {
    const state = authReducer(initialState, login('test-token'));
    expect(state).toEqual({
      isAuthenticated: true,
      token: 'test-token'
    });
  });

  test('should handle logout', () => {
    const loggedInState = { isAuthenticated: true, token: 'test-token' };
    const state = authReducer(loggedInState, logout());
    expect(state).toEqual(initialState);
  });
});