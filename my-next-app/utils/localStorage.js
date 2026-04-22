const TOKEN_KEY = 'tablecrm_token';

export const storage = {
  setToken: (token) => {
    if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
  },
  getToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  removeToken: () => {
    if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  },
};