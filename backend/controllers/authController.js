import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.create({ username, email, password_hash: password });
    const token = generateToken(user.id);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        likedTracks: user.likedTracks || [],
      },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'User already exists' });
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        likedTracks: user.likedTracks || [],
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};