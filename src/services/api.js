import axios from 'axios';

export const getRandomUsers = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
