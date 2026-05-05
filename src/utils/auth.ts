// Auth Token Management
export const getToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

export const setToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('adminToken');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// User Info Storage
export const getUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: any): void => {
  localStorage.setItem('adminUser', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('adminUser');
};

// Logout - Clear everything
export const logout = (): void => {
  removeToken();
  removeUser();
};
