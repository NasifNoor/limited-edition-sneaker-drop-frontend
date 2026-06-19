import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.BACKEND_API_URL ||
    "https://limited-edition-sneaker-drop-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
