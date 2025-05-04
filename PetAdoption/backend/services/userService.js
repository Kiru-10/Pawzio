import * as UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const fetchAllUsers = async () => {
  return await UserModel.getAllUsers();
};

export const fetchUserById = async (id) => {
  return await UserModel.getUserById(id);
};

export const updateUser = async (id, data) => {
  const { name, email, username, password } = data;

  const existingUser = await UserModel.getUserById(id);

  // Compare incoming password with stored one to avoid double hashing
  const isSamePassword = await bcrypt.compare(password, existingUser.password);

  const finalPassword = isSamePassword
    ? existingUser.password
    : await bcrypt.hash(password, 10);

  return await UserModel.updateUser(id, {
    name,
    email,
    username,
    password: finalPassword,
  });
};

