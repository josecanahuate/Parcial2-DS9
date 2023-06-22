const mongoose = require("mongoose");

const chatGptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  id_user: {
    type: String
 /*    ref: "User",
    required: true, */
  },
  date_create: {
    type: Date,
    default: Date.now,
  },
});

const ChatgptModel = mongoose.model("chatgpt", chatGptSchema)

module.exports = ChatgptModel