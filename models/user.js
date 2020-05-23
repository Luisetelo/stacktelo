const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const to = require('await-to-js').default;

const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function preSave(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = async function checkPassword(password) {
  const [error, match] = await to(bcrypt.compare(password, this.password));
  if (error) {
    console.error(error);
  }
  return match;
};

module.exports = mongoose.model('User', UserSchema);
