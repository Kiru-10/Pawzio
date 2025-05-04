import * as UserService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.fetchUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, username, password } = req.body;

  try {
    const updated = await UserService.updateUser(id, { name, email, username, password });
    if (!updated) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
