export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("authToken"); // Retrieve the JWT token

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if the token exists
  };

  // Merge headers and other options
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  // Perform the fetch request
  const response = await fetch(url, config);
  return response;
};
