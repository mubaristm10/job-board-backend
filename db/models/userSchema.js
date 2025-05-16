const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

module.exports = User;
