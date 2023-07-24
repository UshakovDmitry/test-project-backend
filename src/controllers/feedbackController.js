const Feedback = require('../models/Feedback');

exports.sendFeedback = async (req, res, next) => {
  const { text } = req.body;

  try {
    const feedback = new Feedback({ text, userId: req.user.userId });
    await feedback.save();

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
