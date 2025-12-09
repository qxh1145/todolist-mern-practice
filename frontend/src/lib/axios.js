import axios from "axios";

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001" : ""

const api = axios.create({
    baseURL: "http://localhost:5001"
})

export default api