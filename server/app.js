const express = require("express");
const db = require("./keys_config/keys").mongoURI;
const cors = require("cors");
const mongoose = require("mongoose");

const dice = require("./routes/api/dice");

mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.log("not connected to MongoDB");
    console.log(err);
  });

const app = express();
app.use(cors());
const port = process.env.PORT || 5005;

app.use("/api/dice", dice);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
