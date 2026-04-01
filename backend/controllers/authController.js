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
      return res.status(400).json({ message: 'Барлық өріс міндетті' });
    }
    if (/^\d+$/.test(email)) {
      return res.status(400).json({ message: 'Email тек сандардан тұра алмайды' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email форматы дұрыс емес' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Құпия сөз кемінде 6 таңба болуы керек' });
    }
    if (String(username).trim().length < 2) {
      return res.status(400).json({ message: 'Пайдаланушы аты кемінде 2 таңба болуы керек' });
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
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'Бұл email немесе пайдаланушы аты бұрыннан тіркелген' });
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email және құпия сөз міндетті' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Email немесе құпия сөз қате' });
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