import { isClientBasedAuth, isAsapBasedAuth } from '../../auth';

describe('Auth utils', () => {
  describe('#isClientBasedAuth', () => {
    it('should return true if is client based auth', () => {
      expect(
        isClientBasedAuth({
          clientId: 'some-client-id',
          token: 'some-token',
          baseUrl: 'some-base-url',
        }),
      ).toBe(true);
    });
    it('should return false if is asap based auth', () => {
      expect(
        isClientBasedAuth({
          asapIssuer: 'some-asap-issuer',
          token: 'some-token',
          baseUrl: 'some-base-url',
        }),
      ).toBe(false);
    });
  });
  describe('#isAsapBasedAuth', () => {
    it('should return false if is client based auth', () => {
      expect(
        isAsapBasedAuth({
          clientId: 'some-client-id',
          token: 'some-token',
          baseUrl: 'some-base-url',
        }),
      ).toBe(false);
    });
    it('should return true if is asap based auth', () => {
      expect(
        isAsapBasedAuth({
          asapIssuer: 'some-asap-issuer',
          token: 'some-token',
          baseUrl: 'some-base-url',
        }),
      ).toBe(true);
    });
  });
});
