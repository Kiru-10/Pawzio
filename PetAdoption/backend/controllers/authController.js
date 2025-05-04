import authService from '../services/authService.js';

const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

const register = async (req, res) => {
  try {
    const { regNo, name, email, username, password } = req.body;
    const { user, token } = await authService.registerUser({
      regNo,
      name,
      email,
      username,
      password,
    });

    res
      .cookie('token', token, TOKEN_COOKIE_OPTIONS)
      .status(201)
      .json({ message: 'Registered successfully 🐾', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    res
      .cookie('token', token, TOKEN_COOKIE_OPTIONS)
      .status(200)
      .json({
        message: 'Login successful 🎉',
        user,  
        token  
      });
  } catch (err) {
    res.status(401).json({ error: err.message });
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
    .json({ message: 'Logged out successfully 👋' });
};

export default {
  register,
  login,
  logout,
};
