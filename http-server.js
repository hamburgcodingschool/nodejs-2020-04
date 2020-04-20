const http = require('http');
const fs = require('fs'); // file system

// NUR ALS BEISPIEL:
// Dies ist die NodeJS Implementation die ohne externe Pakete wie express.js auskommt.

let server = http.createServer((request, response) => {
  // Datei lesen
  fs.readFile('./public/index.html', (error, data) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200; // 200 = Success // 404 file not found
    // Datei als Antwort zurückschicken
    response.write(data);
    // Anfrage beenden
    response.end();
  });
});

// npm install express --save

console.log('Server starting.....');
server.listen(3000);
