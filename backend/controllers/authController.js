import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const user = await User.create({ username, email, password_hash: password });
    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, username, email, avatar: user.avatar, role: user.role } });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'User already exists' });
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, username: user.username, email, avatar: user.avatar, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};