const express = require('express');
const app = express();

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

app.listen(3000, () => console.log('Server started'));
// STARTEN: nodemon server.js