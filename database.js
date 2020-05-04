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

// funktion zum "bearbeiten" / liken eine Nachricht
// Nachricht aus Datenbank auslesen, Anzahl der Likes erhöhen und wieder abspeichern.
/*
module.exports.likeMessage = (messageId) => {
  return MessageModel.findById(messageId).then(message => { // asynchron: geh mal los und hol ne Message
    message.likes += 1; // synchron
    return message.save(); // asynchron: Speichert die Änderungen an der Message in die Datenbank
  });
}
*/

// likeMessage identische Implementation mit async / await
module.exports.likeMessage = async function likeMessage(messageId) {
  const message = await MessageModel.findById(messageId);
  message.likes += 1;
  await message.save();
}
