// require('dotenv').config({ path: './routes/.env' });
require("dotenv").config({});

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes Import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const instructerRoutes = require("./routes/instructer");
const courseRoutes = require("./routes/course");
const lectureRoutes = require("./routes/lecture");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console);

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", instructerRoutes);
app.use("/api", courseRoutes);
app.use("/api", lectureRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
