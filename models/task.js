const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  },
  owner: {
    type: String,

    required: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
