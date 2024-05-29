import axios from 'axios';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base do backend
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;