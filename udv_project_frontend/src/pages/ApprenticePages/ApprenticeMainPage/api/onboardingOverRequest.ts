import axios, { AxiosError } from "axios";

const apiUrl = 'http://127.0.0.1:8000';

export const getOnboardingOverStatus = async (token: string | null): Promise<boolean> => {
  try {
    const response = await axios.get(`${apiUrl}/api/is_onboarding_over/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.post;

  } catch (error) {
    console.error('Get Getonboarding Over Status Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const putOnboardingOverStatus = async (token: string | null): Promise<boolean> => {
  try {
    const response = await axios.put(`${apiUrl}/api/is_onboarding_over/`, {}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.post;

  } catch (error) {
    console.error('Get Put Onboarding Over Status Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};