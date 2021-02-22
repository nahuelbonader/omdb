const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
