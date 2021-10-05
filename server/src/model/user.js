const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail, isAlpha } = require('validator');
const constant = require('../utils/constant.json');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const schema = new Schema({
  name: {
    type: String,
    min: 6,
    max: 20,
    required: true,
    validate: [isAlpha, constant.response_messages.valid_name],
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, constant.response_messages.valid_email],
  },
  password: {
    type: String,
    min: 6,
    max: 15,
    required: true,
    validate(value) {
      if (!value.match(/\d/) || (!value.match(/[a-zA-Z]/) && value.length > 5 && value.length < 16)) {
        throw new Error(constant.response_messages.valid_password);
      }
    },
  },
});

schema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

schema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

const Model = mongoose.model('User', schema);
module.exports = Model;
