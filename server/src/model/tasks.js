const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: { type: String },
  description: { type: String },
  deadline: { type: String },
  isActive: { type: Boolean },
  isDone: { type: Boolean },
  priority: { type: Number },
});
const Model = mongoose.model('Tasks', schema);
module.exports = Model;
