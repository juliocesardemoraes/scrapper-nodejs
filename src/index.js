const express = require("express");
const app = express();
const { Router } = require("express");
const router = Router();

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(router);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ working: true });
});

app.use("/scrape", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
