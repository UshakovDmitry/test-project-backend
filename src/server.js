
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const authRoutes = require("./routes/authRoutes");
// const feedbackRoutes = require("./routes/feedbackRoutes");


// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/feedback", feedbackRoutes);


// app.listen(8000, () => console.log("Server has been started on port 8000"));

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

mongoose.connect('mongodb+srv://ushakovsky95:15ejkWxSEMdEBLDD@cluster0.kewmmki.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(8000, () => console.log("Server has been started on port 8000"));
