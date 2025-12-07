export const setToken = (token: string): void => {
  try {
    localStorage.setItem("token", token);
  } catch {}
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem("token");
  } catch {}
};
