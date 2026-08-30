import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, signToken, verifyToken } from '../lib/auth';

describe('Authentication & Security Suite', () => {
  it('correctly hashes and verifies passwords using bcrypt', async () => {
    const plain = 'HeritageSecretPass2025';
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash.length).toBeGreaterThan(20);

    const match = await comparePassword(plain, hash);
    expect(match).toBe(true);

    const wrongMatch = await comparePassword('wrongPass', hash);
    expect(wrongMatch).toBe(false);
  });

  it('signs and verifies JWT tokens with payload integrity', () => {
    const payload = {
      userId: 'usr_test_123',
      email: 'curator@heritagefoodatlas.in',
      role: 'ADMIN',
      name: 'Dr. Aparna Sen',
    };

    const token = signToken(payload);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe('usr_test_123');
    expect(decoded?.email).toBe('curator@heritagefoodatlas.in');
    expect(decoded?.role).toBe('ADMIN');
  });

  it('gracefully returns null for invalid JWT tokens', () => {
    const badToken = 'invalid.jwt.token.string';
    const decoded = verifyToken(badToken);
    expect(decoded).toBeNull();
  });
});
