const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('email')
    .isEmail()
    .withMessage('Введите корректный Email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать не менее 6 символов'),
  authController.register
]);

router.post('/login', authController.login);

module.exports = router;
