import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const postNews = async (newsData) => {
  try {
    const response = await axios.post(`${API_URL}/news`, newsData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating news:', error);
    throw error;
  }
};