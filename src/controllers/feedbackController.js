exports.createFeedback = (req, res, next) => {
    const { text } = req.body;
  
    console.log(`Received feedback: ${text}`);
  
    res.status(200).json({ message: "Ваше сообщение отправлено!" });
  };
  