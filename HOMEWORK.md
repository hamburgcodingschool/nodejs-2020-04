# Session 1
Travel Blog über expressjs ausliefern.

# Session 2
Hausaufgabe:
Einträge im TravelBlog sollen nicht mehr aus Firebase gelesen werden, sondern über die `/posts` Route von node.js geladen werden.

Beispiel für einen Post als JSON
```
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
  "text": "The Great Temple at Abu Simbel, which took about twenty years to build, was completed around year 24 of the reign of Ramesses the Great (which corresponds to 1265 BC). It was dedicated to the gods Amun, Ra-Horakhty, and Ptah, as well as to the deified Ramesses himself. It is generally considered the grandest and most beautiful of the temples commissioned during the reign of Ramesses II, and one of the most beautiful in Egypt.",
  "title": "Temple of Ramesses II"
}
```

Folgende Dateien müssen bearbeitet werden:
[server.js](./server.js#L25)
[public/index.js](./public/index.js#L11)

Egal ob in diesem Repository oder in eurem Travel Blog.

Hinweis: Wenn man mit `fetch()` JSON empfängt, macht es vieles einfacher wenn man [response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json#Example) verwendet. Dazu muss aber auch der `Content-Type` Header richtig gesetzt werden.
