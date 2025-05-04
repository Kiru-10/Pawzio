import { getAllContacts, addContact } from '../services/contactService.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

export const submitContact = async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const newContact = await addContact({ name, email, phone, message });
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ message: "Error submitting contact" });
  }
};
