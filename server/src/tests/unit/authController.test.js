import { register, login } from '../../controllers/authController';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registers a new user', async () => {
    User.mockImplementation(() => ({ save: jest.fn().mockResolvedValue({}) }));
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered' });
  });

  test('logs in with valid credentials', async () => {
    User.findOne.mockResolvedValue({
      comparePassword: jest.fn().mockResolvedValue(true),
      _id: '123'
    });
    jwt.sign.mockReturnValue('test-token');
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { json: jest.fn() };

    await login(req, res);
    expect(res.json).toHaveBeenCalledWith({ token: 'test-token' });
  });

  test('rejects invalid credentials', async () => {
    User.findOne.mockResolvedValue(null);
    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});