import authMiddleware from '../../middleware/authMiddleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test('allows valid token', () => {
    req.headers.authorization = 'Bearer test-token';
    jwt.verify.mockReturnValue({ userId: '123' });

    authMiddleware(req, res, next);
    expect(req.userId).toBe('123');
    expect(next).toHaveBeenCalled();
  });

  test('rejects missing token', () => {
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
  });

  test('rejects invalid token', () => {
    req.headers.authorization = 'Bearer invalid';
    jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });
});