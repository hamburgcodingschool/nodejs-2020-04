const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
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
    messages.push(message);
  } else {
    response.statusCode = 401; // 401 Unauthorized; 404 Not Found
    response.write('Du musst dich zuerst registrieren!');
  }

  response.end(); // StatusCode 200
});
// READ MESSAGES: GET /messages => Nachrichten auslesen
app.get('/messages', (request, response) => {
  response.write(JSON.stringify(messages));
  response.end();
});




// UPDATE MESSAGE: PATCH /message => Nachricht bearbeiten
// DELETE MESSAGE: DELETE /message => Nachricht löschen


app.listen(3000, () => console.log('Server started'));
// STARTEN: nodemon server.js