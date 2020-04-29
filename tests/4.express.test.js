describe("expressjs", () => {
  /*
    Um diese Tests auszuführen entferne das x vor xtest()  bei dem Test den du ausführen möchtest (Zeile 11, 35, ...)
    Die Tests werden dann automatisch ausgeführt (wenn `npm t` noch läuft) und du kannst mit der Lösung loslegen

    Über app.get() oder app.post() kannst du eine Route definieren.
    Es gibt zwei Parameter, den Name der Route und die Callback Funktion, die den Request und den Response als Parameter erhält.
  */

  xtest("#1 get /books", () => {
    // SETUP
    const { app, response } = setupAppMock({});

    // TASK:
    // Sende alle Bücher als Antwort
    const books = [
      { title: "Mariannengraben", ISBN: "9783847900429" },
      { title: "Factfulness", ISBN: "9783550081828" },
    ];

    // YOUR SOLUTION
    // start with app.get(...)






    // DONT CHANGE THE NEXT LINE
    expect(app.get).toHaveBeenCalledWith("/books", expect.any(Function));
    expect(response.write).toHaveBeenCalledWith(
      '[{"title":"Mariannengraben","ISBN":"9783847900429"},{"title":"Factfulness","ISBN":"9783550081828"}]'
    );
    expect(response.setHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json"
    );
    expect(response.end).toHaveBeenCalled();
  });




  xtest("#2 post /book", () => {
    // SETUP
    const stubBook = { title: "Der Hobbit", ISBN: "9783423085595" };
    const { app, response } = setupAppMock({ body: { book: stubBook } });

    // TASK:
    // Speichere das Buch aus request.body in das Array books
    // Hinweis: Es wird ein JSON request erwartet und du kannst davon ausgehen dass der bodyParser korrekt eingestellt ist.
    // Tipp: Du kannst dir den Request angucken in dem du console.log(request); in deinen Callback Handler schreibst.
    const books = [];

    // YOUR SOLUTION
    // start with app.post(...)






    // DONT CHANGE THE NEXT LINE
    expect(app.post).toHaveBeenCalledWith("/book", expect.any(Function));
    expect(books).toEqual([{ title: "Der Hobbit", ISBN: "9783423085595" }]);
    expect(response.end).toHaveBeenCalled();
  });




  xtest("#2 post /book", () => {
    // SETUP
    const { app, sendRequest, response } = setupAppMock();

    // TASK:
    // Speichere das Buch NICHT ab wenn du das Buch bereits gespeichert hast (ein Eintrag mit dieser ISBN existiert schon)
    // Hinweis: Schicke einen Status Code zurück, der anzeigt dass die Anfrage fehlgeschlagen ist (Siehe: https://httpstatuses.com/)
    // Hinweis: Und schicke eine Nachricht in der Response, die das Wort "Fehler" enthält
    const books = [{ title: "Der Hobbit", ISBN: "9783423085595" }];

    // YOUR SOLUTION
    // start with app.post(...)







    // DONT CHANGE THE NEXT LINE
    expect(app.post).toHaveBeenCalledWith("/book", expect.any(Function));

    // First: existing book
    const existingBook = { title: "Der Hobbit", ISBN: "9783423085595" };
    sendRequest({ body: { book: existingBook } });
    expect(response.setStatus).toHaveBeenCalledWith(400);
    expect(response.write.mock.calls[0][0]).toMatch(/Fehler/gi);
    expect(response.end).toHaveBeenCalled();
    expect(books).toEqual([{ title: "Der Hobbit", ISBN: "9783423085595" }]);

    // Second: new book book
    const newBook = { title: "Factfulness", ISBN: "9783550081828" };
    sendRequest({ body: { book: newBook } });
    expect(response.end).toHaveBeenCalled();
    expect(books).toEqual([
      { title: "Der Hobbit", ISBN: "9783423085595" },
      { title: "Factfulness", ISBN: "9783550081828" },
    ]);
  });




  xtest("#4 patch /book", () => {
    // SETUP
    const stubBook = { title: "Factfulness", ISBN: "9783550081828" };
    const { app, response } = setupAppMock({
      params: { isbn: stubBook.ISBN },
      body: { book: stubBook },
    });

    // TASK:
    // Tippfehler im Titel von Factfullness! Da ist ein L zu viel.
    // Über einen PATCH request wollen wir erlauben dass Bücher bearbeitet werden.
    // Dazu wird die ISBN als Path parameter übergeben (Siehe: https://expressjs.com/en/guide/routing.html#route-parameters)
    const books = [
      { title: "Mariannengraben", ISBN: "9783847900429" },
      { title: "Factfullness", ISBN: "9783550081828" },
    ];

    // YOUR SOLUTION
    // start with app.patch(...)








    // DONT CHANGE THE NEXT LINE

    expect(app.patch).toHaveBeenCalledWith("/book/:isbn", expect.any(Function));
    expect(books).toEqual([
      { title: "Mariannengraben", ISBN: "9783847900429" },
      { title: "Factfulness", ISBN: "9783550081828" },
    ]);
    expect(response.end).toHaveBeenCalled();
  });




  xtest("#5 delete /book", () => {
    // SETUP
    const stubBook = { title: "Factfulness", ISBN: "9783550081828" };
    const { app, response } = setupAppMock({
      params: { isbn: stubBook.ISBN },
    });

    // TASK:
    // Buch aus Liste entfernen.
    // Über einen DELETE request wollen wir erlauben dass Bücher aus der Liste entfernt werden
    // Dazu wird die ISBN als Path parameter übergeben (Siehe: https://expressjs.com/en/guide/routing.html#route-parameters)
    let books = [
      { title: "Mariannengraben", ISBN: "9783847900429" },
      { title: "Factfullness", ISBN: "9783550081828" },
    ];

    // YOUR SOLUTION
    // start with app.delete(...)








    // DONT CHANGE THE NEXT LINE
    expect(app.delete).toHaveBeenCalledWith(
      "/book/:isbn",
      expect.any(Function)
    );
    expect(books).toEqual([
      { title: "Mariannengraben", ISBN: "9783847900429" },
    ]);
    expect(response.end).toHaveBeenCalled();
  });
});

// SETUP
function setupAppMock(request) {
  const responseEnd = jest.fn();
  const responseWrite = jest.fn();
  const responseHeader = jest.fn();
  const responseStatus = jest.fn();

  const response = {
    end: responseEnd,
    write: responseWrite,
    setHeader: responseHeader,
    setStatus: responseStatus,
  };

  let cb = null;

  const get = jest.fn((path, callback) => {
    cb = callback;
    if (!request) {
      return;
    }
    callback(request, response);
  });

  const post = jest.fn((path, callback) => {
    cb = callback;
    if (!request) {
      return;
    }
    callback(request, response);
  });

  const patch = jest.fn((path, callback) => {
    cb = callback;
    if (!request) {
      return;
    }
    callback(request, response);
  });

  const methodDelete = jest.fn((path, callback) => {
    cb = callback;
    if (!request) {
      return;
    }
    callback(request, response);
  });

  return {
    app: { get, post, patch, delete: methodDelete },
    response,
    sendRequest: (req, res = response) => cb(req, res),
  };
}
