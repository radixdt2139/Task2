const express = require("express");
const mongoose = require("mongoose");
  const Router = require("./Router/routes");
  var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/task2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});