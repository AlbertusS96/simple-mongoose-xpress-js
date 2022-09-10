const router = require("express").Router();

const {
  get,
  create,
  getById,
  update,
  delete: deleteNote,
} = require("../controller/note.controllers");

router.route("/").get(get).post(create);

router.route("/:id").get(getById).patch(update).delete(deleteNote);

module.exports = router;
