import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// REQUEST INTERCEPTOR
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {

    if (
      response.config.url.includes("/login") ||
      response.config.url.includes("/register")
    ) {

      const token = response.data?.token;
      const user = response.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }

    return response;
  },

  (error) => {

    const msg = error.response?.data?.message;

    console.error("API ERROR:", msg || error.message);

    if (
      error.response?.status === 401 ||
      msg === "jwt expired" ||
      msg === "invalid token"
    ) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;