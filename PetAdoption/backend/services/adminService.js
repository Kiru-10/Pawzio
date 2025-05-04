import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const registerAdmin = async ({ regNo, name, email, username, password }) => {
  const existing = await adminModel.findAdminByUsername(username);
  if (existing) {
    throw new Error('Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await adminModel.createAdmin({
    regNo,
    name,
    email,
    username,
    password: hashedPassword,
  });

  const token = generateToken(newAdmin);
  return { admin: newAdmin, token };
};

const loginAdmin = async ({ username, password }) => {
  const admin = await adminModel.findAdminByUsername(username);
  if (!admin) throw new Error('Admin not found');

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) throw new Error('Invalid credentials');

  const token = generateToken(admin);
  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
      regNo: admin.regNo,
      password: admin.password,
    },
    token,
  };
};

const getAdminById = async (id) => {
  const admin = await adminModel.findAdminById(id);
  if (!admin) throw new Error('Admin not found');
  return admin;
};

const updateAdmin = async (id, { regNo, name, email, username, password }) => {
  const admin = await adminModel.findAdminById(id);
  if (!admin) throw new Error('Admin not found');

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedAdmin = await adminModel.updateAdmin(id, {
    regNo,
    name,
    email,
    username,
    password: hashedPassword || admin.password,
  });

  return updatedAdmin;
};

export default {
  registerAdmin,
  loginAdmin,
  getAdminById,
  updateAdmin,
};
