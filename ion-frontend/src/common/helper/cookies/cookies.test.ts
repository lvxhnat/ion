import { deleteCookie, getCookie, setCookie } from './';

const cookieMock = {
  tokenName: 'token',
  tokenValue: 'token',
  dateName: 'x-date',
  dateValue: String(new Date()),
};

describe('cookies helper', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      value: `${cookieMock.tokenName}=${cookieMock.tokenValue};`,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCookie', () => {
    it('should return the right value', () => {
      const token = getCookie(cookieMock.tokenName);

      expect(token).toBe(cookieMock.tokenValue);
    });
  });

  describe('setCookie', () => {
    it('should delete before set', () => {
      setCookie(cookieMock.dateName, cookieMock.dateValue);

      const date = getCookie(cookieMock.dateName);
      expect(date).toBe(cookieMock.dateValue);
    });
  });

  describe('deleteCookie', () => {
    it(`with ${cookieMock.tokenName} key`, () => {
      deleteCookie(cookieMock.tokenName);

      const token = getCookie(cookieMock.tokenName);
      expect(token).toBe('');
    });

    it('with any key', () => {
      Object.defineProperty(window.document, 'cookie', {
        value: `${cookieMock.dateName}=${cookieMock.dateValue};`,
        writable: true,
      });
      deleteCookie(cookieMock.dateName);

      const token = getCookie(cookieMock.dateName);
      expect(token).toBe('');
    });

    it('with invalid key key', () => {
      const anyKey = 'anything';
      deleteCookie(anyKey);

      const token = getCookie(anyKey);
      expect(token).toBe(undefined);
    });
  });
});
