const express = require("express");
require('dotenv').config();
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

// app.use(cors());   edited and now on line 12
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

// config
require("./config/mongoose.config");

// routes
require("./routes/carmeet.routes")(app);
require("./routes/user.routes")(app);

app.listen(8000, () => {
  console.log("Backend server running on Port 8000");
});