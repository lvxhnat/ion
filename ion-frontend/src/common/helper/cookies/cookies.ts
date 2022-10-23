import UniversalCookies, { CookieSetOptions } from 'universal-cookie';

const defaultOptions = {
  path: '/',
};

export const getCookie = (name: string) => {
  const cookies = new UniversalCookies();
  return cookies.get(name);
};

export const setCookie = (name: string, value: any, options?: CookieSetOptions) => {
  const cookies = new UniversalCookies();
  cookies.set(name, value, { ...defaultOptions, ...options });
};

export const deleteCookie = (name: string) => {
  const cookies = new UniversalCookies();
  if (cookies.get(name)) {
    cookies.remove(name, { path: '/' });
  }
};
