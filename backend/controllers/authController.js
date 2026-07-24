import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide both username and password' });
    }

    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        status: 'success',
        message: 'Login successful',
        data: {
          _id: admin._id,
          username: admin.username,
          token: generateToken(admin._id),
        },
      });
    } else {
      return res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in Admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({ status: 'fail', message: 'Admin account not found' });
    }
    res.json({ status: 'success', data: admin });
  } catch (error) {
    next(error);
  }
};
