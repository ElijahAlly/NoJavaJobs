const express = require("express");
const db = require("./keys_config/keys").mongoURI;
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const jobs = require("./routes/api/jobs");
const toptech = require("./routes/api/toptech");

const app = express();
app.use(cors());
const port = process.env.PORT || 5055;

const useDbRoutes = () => {
  app.use(express.static('public'));
  app.use("/api/jobs", jobs);
  app.use("/api/toptech", toptech);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

mongoose
  .connect(db)
  .then(() => {
    useDbRoutes(); // Use when connected to MongoDb
    console.log("Connected to MongoDB successfully")
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB");
    console.log(err);
    if (err.code === 'ECONNREFUSED') {
      console.log('Might be related to network issues. To connect to MongoDb, check your connection then try restarting the server.' );
    }
  });