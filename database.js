const mongoose = require("mongoose");
// npm install --save mongoose

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  likes: Number,
});

const MessageModel = mongoose.model("Message", messageSchema);

mongoose.connect("mongodb://localhost:27017/travelBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports.bootstrap = function bootstrap() {
  return new Promise((resolve, reject) => {
    mongoose.connection.once("open", () => {
      // Database Connection established
      resolve();
    });
  })
}

// alle Nachrichten aus der Datenbank:
module.exports.getMessages = function getMessages() {
  return MessageModel.find();
}

module.exports.createMessage = (message) => {
  return MessageModel.create(message);
}
