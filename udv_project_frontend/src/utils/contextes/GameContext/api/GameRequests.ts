import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getGameInfo = async (token: string | null): Promise<GameObject> => {
  try {
    const response = await axios.get(`${apiUrl}/api/game/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Get Game Info Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const putGameBack = async (elementId: number, token: string | null): Promise<GameObject> => {
    try {
      const response = await axios.put(`${apiUrl}/api/game/${elementId}/`, { }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
  
    } catch (error) {
      console.error('Put Game Back Error:', (error as AxiosError)?.response || (error as Error).message);
      throw error;
    }
  };
