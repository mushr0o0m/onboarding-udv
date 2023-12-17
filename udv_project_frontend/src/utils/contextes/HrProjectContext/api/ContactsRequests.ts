import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getContactList = async (token: string | null): Promise<Contact[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/contacts/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.post;

  } catch (error) {
    console.error('Get All Contacts Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const postContact = async (contact: Omit<Contact, 'id'>, token: string | null): Promise<Contact> => {
  try {
    const response = await axios.post(`${apiUrl}/api/contacts/`, contact,
     {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return {...response.data.post, id: response.data.contact_id};

  } catch (error) {
    console.error('Get All Contacts Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};