const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post('/register', [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
], authController.register);

router.post('/login', [
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists()
], authController.login);

module.exports = router;
