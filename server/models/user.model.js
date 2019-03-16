const uniquePlugin = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be least two characters'],
      trim: true,
    },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least two characters'],
        trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
      required: [true, 'You must provide a password'],
      minlength: [4, 'password must be at least 4 characters']
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniquePlugin, { message: '{VALUE} is not unique' });

UserSchema.pre('validate', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(next);
});

UserSchema.static('validatePassword', function(
  candidatePassword,
  hashedPassword
) {
  return bcrypt.compare(candidatePassword, hashedPassword);
});

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', UserSchema);