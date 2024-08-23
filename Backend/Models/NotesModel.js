const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
  },
  pin: {
    type: Boolean,
    default: false,
  },
});
const Notes = mongoose.model("NotesSchema", NoteSchema);
module.exports = Notes;
