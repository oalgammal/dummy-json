import axios, { Method } from 'axios';

const BASE_URL = 'https://dummyjson.com/';

const fetcher = async (path: string, method: Method = 'GET', data?: any): Promise<any> => {
    const token = localStorage.getItem('jwt'); // Retrieve JWT token from localStorage

    const headers = {
          Authorization: `Bearer ${token??''}`,
          'Content-Type': 'application/json',} 
  const config = {
    method,
    url: `${BASE_URL}${path}`,
    data,
    headers
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error('Error fetching data:', error);
    throw error; // Rethrow or handle as needed
  }
};

export default fetcher;
