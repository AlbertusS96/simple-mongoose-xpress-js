require("./src/app/config/config");
const express = require("express");
const cors = require("cors");

const config = require("./src/app/config/config");
const db = require("./src/app/models/index");
const routes = require("./src/app/routes/index");
const { formatResponse } = require("./src/app/utils/formatter");

const app = express();
const dbUrl = config.dbUrl || "no db";

var corsOptions = {
  origin: config.cors,
};

// express setup
app.use(cors(corsOptions));
app.use(express.json());

// Connect to mongo DB
db.mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to the ${dbUrl.split("/")[0]}!`);
  })
  .catch((err) => {
    console.log("Cannot connect to the database! \n", err);
    process.exit();
  });

//include all routes
app.use("/", routes);

app.use(function (req, res) {
  res
    .status(404)
    .send(
      formatResponse(`${req.originalUrl} not found`, false, 404, undefined)
    );
});

module.exports = app;
