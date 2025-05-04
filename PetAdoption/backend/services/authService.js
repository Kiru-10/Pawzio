import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authModel from '../models/authModel.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const registerUser = async ({ regNo, name, email, username, password }) => {
  const existing = await authModel.findUserByUsername(username);
  if (existing) {
    throw new Error('Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await authModel.createUser({
    regNo,
    name,
    email,
    username,
    password: hashedPassword,
  });

  const token = generateToken(newUser);
  return { user: newUser, token };
};

const loginUser = async ({ username, password }) => {
  const user = await authModel.findUserByUsername(username);
  if (!user) throw new Error('User not found');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      regNo: user.regNo,
      password: user.password, 
    },
    token,
  };
};

export default {
  registerUser,
  loginUser,
};
