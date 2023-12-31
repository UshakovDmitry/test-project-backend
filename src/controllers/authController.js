const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map(error => error.msg).join(', ');
    return res.status(400).json({ message: `Ошибка валидации: ${errorMessage}` });
  }

  const { email, password, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Ошибка: пользователь с данным email уже существует.' });
    }

    user = new User({ email, password, name });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: `Ошибка сервера: ${error.message}` });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Ошибка: неверный email или пароль.' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ message: `Ошибка сервера: ${error.message}` });
  }
};
