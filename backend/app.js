require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Routes = require("./routes/routes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(cookieParser());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected")).catch(err => {
    console.log("MongoDb Connection errror", err)
    process.exit(0)
  });

app.use('/api/v1', Routes);

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
