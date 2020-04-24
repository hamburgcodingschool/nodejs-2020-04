const express = require('express');
const bodyParser = require('body-parser');
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

/***** HOMEWORK SESSION 2 (für Freitag) hier
route /posts anlegen, die einen oder mehrere (als JSON hinterlegte) Posts zurückgibt.

Beispiel Post:
{
  "author": "Clemens_B",
  "author_image": "img/icon_cm--portugal.jpg",
  "date": {
    "seconds": 1586683203,
    "nanoseconds": 256000000
  },
  "image": {
    "alt": "Temple of Ramesses II",
    "src": "/img/24Abu_simbel_Temple800.jpg"
  },
  "location": {
    "city": "Aswan",
    "country": "Egypt",
    "lat": 22.336944,
    "lng": 31.625556
  },
  "text": "If this is visible on your website, the homework is done.     The Great Temple at Abu Simbel, which took about twenty years to build, was completed around year 24 of the reign of Ramesses the Great (which corresponds to 1265 BC). It was dedicated to the gods Amun, Ra-Horakhty, and Ptah, as well as to the deified Ramesses himself. It is generally considered the grandest and most beautiful of the temples commissioned during the reign of Ramesses II, and one of the most beautiful in Egypt.",
  "title": "Temple of Ramesses II"
}
*/
const posts = [
  {
    "author": "Clemens_B",
    "author_image": "img/icon_cm--portugal.jpg",
    "date": {
      "seconds": 1586683203,
      "nanoseconds": 256000000
    },
    "image": {
      "alt": "Temple of Ramesses II",
      "src": "/img/24Abu_simbel_Temple800.jpg"
    },
    "location": {
      "city": "Aswan",
      "country": "Egypt",
      "lat": 22.336944,
      "lng": 31.625556
    },
    "text": "Aus nodejs",
    "title": "Temple of Ramesses II"
  }
]

app.get('/posts', (request, response) => {
  response.write(JSON.stringify(posts));
  response.end();
});


// CREATE MESSAGE: POST /message => Nachricht anlegen

// UPDATE MESSAGE: PATCH /message => Nachricht bearbeiten
// DELETE MESSAGE: DELETE /message => Nachricht löschen

const messages = [{ text: 'Hallo', sender: 'Alfons' }, { text: 'Hi!', sender: 'Alf' }];
app.post('/message', (request, response) => {
  const message = request.body;
  messages.push(message);
});

// READ MESSAGES: GET /messages => Nachrichten auslesen
app.get('/messages', (request, response) => {
  response.write(JSON.stringify(messages));
  response.end();
})



app.listen(3000, () => console.log('Server started'));
// STARTEN: nodemon server.js