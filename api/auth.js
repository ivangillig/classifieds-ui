// app/api/authApi.js
export const fetchUserApi = async () => {
  const response = await fetch('http://localhost:5000/api/user', {
    credentials: 'include', // include cookies
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};
