const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.note = require("./note.models")(mongoose);

module.exports = db;
