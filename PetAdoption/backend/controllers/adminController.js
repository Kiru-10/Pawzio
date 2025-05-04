import adminService from '../services/adminService.js';

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, 
};

const register = async (req, res) => {
  try {
    const { regNo, name, email, username, password } = req.body;
    const { admin, token } = await adminService.registerAdmin({
      regNo,
      name,
      email,
      username,
      password,
    });

    res
      .cookie('token', token, TOKEN_COOKIE_OPTIONS)
      .status(201)
      .json({ message: 'Admin registered successfully 🐾', admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { admin, token } = await adminService.loginAdmin(req.body);

    res
      .cookie('token', token, TOKEN_COOKIE_OPTIONS)
      .status(200)
      .json({
        message: 'Admin login successful 🎉',
        admin,
        token,
      });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Get admin profile by ID
const getById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    res.status(200).json({ admin });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Update admin details
const update = async (req, res) => {
  try {
    const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json({ message: 'Admin updated successfully', updatedAdmin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Logout: clear the cookie
const logout = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ message: 'Admin logged out successfully 👋' });
};

export default {
  register,
  login,
  getById,
  update,
  logout,
};
