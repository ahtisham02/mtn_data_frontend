import axios from "axios";

const apiRequest = async (method, url, data = {}, token, headers = {}) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const config = {
    method: method.toLowerCase(),
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  switch (method.toLowerCase()) {
    case "get":
    case "delete":
      config.params = data;
      break;
    case "post":
    case "put":
    case "patch":
      config.data = data;
      break;
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export default apiRequest;
