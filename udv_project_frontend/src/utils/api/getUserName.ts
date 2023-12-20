import axios, { AxiosError } from "axios";

const apiUrl = 'http://127.0.0.1:8000';

export const getUserName = async (token: string | null): Promise<UserFullName> => {
  try {
    const response = await axios.get(`${apiUrl}/api/name/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Get User Name Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
}