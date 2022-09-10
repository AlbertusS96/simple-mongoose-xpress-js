const db = require("../models");
const { formatResponse } = require("../utils/formatter");

const Note = db.note;

// Getting all note
exports.get = async (req, res) => {
  await Note.find()
    .then((notes) => {
      //case db = empty
      if (notes.length === 0) {
        return res
          .status(200)
          .json(
            formatResponse("Database is empty", true, undefined, undefined)
          );
      }

      return res.status(200).json(
        formatResponse("Successfully retrieve all notes", true, undefined, {
          notes,
        })
      );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(formatResponse(err.message, false, 500, undefined));
    });
};

// Getting one note
exports.getById = async (req, res) => {
  const id = req.params.id;

  Note.findOne({ _id: id })
    .then((note) => {
      //case id not found
      if (!note)
        return res
          .status(404)
          .send(
            formatResponse(
              `Can not find note with id=${id}`,
              false,
              404,
              undefined
            )
          );

      return res.send(
        formatResponse(
          `Successfully retrieve note with id=${id}`,
          true,
          undefined,
          {
            note,
          }
        )
      );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(formatResponse(err.message, false, 500, undefined));
    });
};

// Add new note
exports.create = async (req, res) => {
  const { title, content, done } = req.body;
  const note = new Note({ title, content, done });

  await note
    .save()
    .then((newNote) => {
      return res.status(201).send(
        formatResponse("Successfully add new note", true, undefined, {
          note: newNote,
        })
      );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(formatResponse(err.message, false, 500, undefined));
    });
};

// Update a note by id
exports.update = (req, res) => {
  const id = req.params.id;

  Note.findOne({ _id: id })
    .then((data) => {
      if (data) {
        Note.findByIdAndUpdate(id, req.body, {
          useFindAndModify: false,
          new: true,
        })
          .then((data) => {
            return res.send(
              formatResponse("Successfully update note", true, undefined, {
                note: data,
              })
            );
          })
          .catch((err) => {
            return res
              .status(500)
              .send(formatResponse(err.message, false, 500, undefined));
          });
      }

      return res
        .status(404)
        .send(
          formatResponse(
            `Cannot update note with id= ${id}. Failed to find note with that id`,
            false,
            494,
            undefined
          )
        );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(formatResponse(err.message, false, 500, undefined));
    });
};

// HARD Delete a note by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send(
            formatResponse(
              `Cannot delete note with id= ${id}. Failed to find note with that id`,
              false,
              494,
              undefined
            )
          );
      }

      return res.send(
        formatResponse(
          `Successfully delete note with id= ${id}`,
          true,
          undefined,
          undefined
        )
      );
    })
    .catch((err) => {
      return res
        .status(500)
        .send(formatResponse(err.message, false, 500, undefined));
    });
};
