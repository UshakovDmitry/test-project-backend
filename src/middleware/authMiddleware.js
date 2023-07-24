const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const payload = jwt.verify(token, 'secret');
    req.user = payload; // сохраняем данные пользователя в объект запроса
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Токен истек' });
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Невалидный токен' });
    }
  }
};
