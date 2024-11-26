const express = require("express");
const bodyParser=require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

console.log("MongoDB URL:", process.env.MONGO_URL);

if (!process.env.MONGO_URL) {
  console.error("MongoDB URL is missing in the .env file");
  process.exit(1); 
}

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.send("Alumni Portal Backend Mongodb");
});
// MongoDb connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Connected");
    }
  }
);

// routes
const auth=require("./routes/auth");
const admin=require("./routes/admin");

//routes use
app.use("/api/auth/", auth);
app.use("/api/admin",admin);

app.listen(process.env.PORT, () => {
  console.log("Server started at port " + process.env.PORT);
});
