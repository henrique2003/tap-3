import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
    "X-Requested-With, content-type, Authorization",
    "x-api-key": process.env.EXPO_PUBLIC_SERVICE_API_KEY,
  },
});
