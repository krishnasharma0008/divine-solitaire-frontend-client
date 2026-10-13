const TOKEN_KEY = "admin-token";
const NAME_KEY = "admin-name";

const stores = (): Storage[] =>
  typeof window === "undefined"
    ? []
    : [window.sessionStorage, window.localStorage];

const read = (key: string): string | null => {
  for (const store of stores()) {
    const value = store.getItem(key);
    if (value) return value;
  }
  return null;
};

export const getAdminToken = (): string | null => read(TOKEN_KEY);

export const getAdminName = (): string | null => read(NAME_KEY);

// remember = true keeps the session after the browser closes
export const setAdminSession = (
  token: string,
  name: string,
  remember: boolean
): void => {
  clearAdminSession();
  const store = remember ? window.localStorage : window.sessionStorage;
  store.setItem(TOKEN_KEY, token);
  store.setItem(NAME_KEY, name);
};

export const clearAdminSession = (): void => {
  for (const store of stores()) {
    store.removeItem(TOKEN_KEY);
    store.removeItem(NAME_KEY);
  }
};
