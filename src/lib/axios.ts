import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
