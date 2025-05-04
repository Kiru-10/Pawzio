import { getContactsFromDB, addContactToDB } from '../models/contactModel.js';

export const getAllContacts = async () => {
  try {
    return await getContactsFromDB();
  } catch (error) {
    throw new Error("Service error fetching contacts: " + error.message);
  }
};

export const addContact = async ({ name, email, phone, message }) => {
  try {
    return await addContactToDB({ name, email, phone, message });
  } catch (error) {
    throw new Error("Service error adding contact: " + error.message);
  }
};
