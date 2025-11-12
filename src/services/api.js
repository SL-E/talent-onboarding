import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:5071/api' });

export default api;