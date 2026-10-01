import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV
  ? "/api"
  : "https://keeperapp-production.up.railway.app/api");

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
