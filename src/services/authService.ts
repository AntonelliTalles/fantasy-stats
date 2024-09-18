import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ajuste para o endpoint correto

// Função para realizar o login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error: any) {  // Colocando `any` aqui para o erro
    const message = error.response?.data?.msg || 'Erro ao fazer login';
    throw new Error(message);
  }
};

// Função para registrar um novo usuário
export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Erro ao registrar usuário';
    throw new Error(message);
  }
};

// Função para recuperar senha (a ser implementada)
export const recoverPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/recover-password`, { email });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.msg || 'Erro ao recuperar senha';
    throw new Error(message);
  }
};
