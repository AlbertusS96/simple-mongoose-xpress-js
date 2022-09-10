module.exports = (mongoose) => {
  const Note = mongoose.model(
    "note",
    mongoose.Schema(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        done: {
          type: Boolean,
          required: false,
          default: false,
        },
      },
      { timestamps: true }
    )
  );

  return Note;
};
