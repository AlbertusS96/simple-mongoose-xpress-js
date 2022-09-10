require("dotenv").config(".env");
const config = require("./src/app/config/config");
const app = require("./index");

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
