const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// database.js einbinden
const database = require('./database.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const registeredNames = [];

// http://localhost:3000/register?name=Paul => Namen registrieren
app.get('/register', (request, response) => {
  const name = request.query.name; // Paul
  registeredNames.push(name);

  response.write(registeredNames.join(','));
  response.end();
});

// curl http://localhost:3000/list => registrierte Namen zurückgeben
// ['Paul', 'Hans'] => Paul<br>Hans<br>
app.get('/list', (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.write(registeredNames.join('<br>'));
  response.end();
});

let messages = [{ text: 'Hallo', sender: 'Alfons' }, { text: 'Hi!', sender: 'Alf' }];

// Aufgabe: nur Namen, die vorher registriert sind dürfen Nachrichten schreiben

// CREATE MESSAGE: POST /message => Nachricht anlegen
app.post('/message', (request, response) => {
  const message = request.body;

  const sender = message.sender;
  const found = registeredNames.indexOf(sender) >= 0;

  if (found) {
    const dMessage = {
      sender: sender,
      text: message.text,
      likes: 0,
    };

    // Aufgabe: message in mongodb speichern
    database.createMessage(dMessage).then(() => {
      response.end();
    });

    // alt: messages.push(message);
  } else {
    response.statusCode = 401; // 401 Unauthorized; 404 Not Found
    response.write('Du musst dich zuerst registrieren!');
    response.end();

  }

});
// READ MESSAGES: GET /messages => Nachrichten auslesen
app.get('/messages', (request, response) => {
  database.getMessages().then(messages => {
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(messages));
    response.end();
  });

  /*
  fs.readFile('./chatMessages.json', (error, data) => {
    const messagesFromFile = JSON.parse(data.toString());
    messages = messagesFromFile;
    response.write(JSON.stringify(messagesFromFile));
    response.end();
  });
  */
});




// UPDATE MESSAGE: PATCH /message => Nachricht bearbeiten
// DELETE MESSAGE: DELETE /message => Nachricht löschen

database.bootstrap().then(() => {
  // Express App erst starten wenn wir sicher sind, dass wir eine Verbindung
  // zur Datenbank haben.
  app.listen(3000, () => console.log('Server started'));
});
// STARTEN: nodemon server.js