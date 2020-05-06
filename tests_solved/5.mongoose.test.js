describe("expressjs", () => {
  /*
    Um diese Tests auszuführen entferne das x vor xtest()  bei dem Test den du ausführen möchtest
    Die Tests werden dann automatisch ausgeführt (wenn `npm t` noch läuft) und du kannst mit der Lösung loslegen

    Mit Mongoose definierst du wie die Daten aussehen sollen, die du in der MongoDB speicherst. Dafür wird new mongoose.schema() verwendet.
    Mit mongoose.model()
  */

  test("#1 books schema and model", () => {
    // SETUP
    let stubSchema = jest.fn();
    let stubModel = { create: jest.fn() };
    const mongoose = {
      model: jest.fn((name, schema) => stubModel),
      Schema: jest.fn((definition) => stubSchema),
    };

    // TASK:
    // Erstelle ein Schema für Bücher und speichere alle Bücher aus "myBooks" (z.B. mittels foreach) in der MongoDB Collection "Books"
    // Hinweis: du brauchst mongoose.Schema, mongoose.model und create()
    const myBooks = [
      { title: "Mariannengraben", ISBN: "9783847900429", stock: 321 },
      { title: "Factfulness", ISBN: "9783550081828", stock: 5 },
    ];

    // YOUR SOLUTION
    // Erstelle zuerst das Schema, dann das Model. Die Aufgabe ist gelöst wenn du alle Books über .create() erstellt hast.
    const schema = new mongoose.Schema({
      title: String,
      ISBN: String,
      stock: Number,
    });

    const model = mongoose.model("Books", schema);
    myBooks.forEach((book) => model.create(book));

    // DONT CHANGE THE NEXT LINE
    expect(mongoose.Schema).toHaveBeenCalled();
    expect(mongoose.Schema.mock.calls[0][0].title).toEqual(String);
    expect(mongoose.Schema.mock.calls[0][0].ISBN).toEqual(String);
    expect(mongoose.Schema.mock.calls[0][0].stock).toEqual(Number);
    expect(mongoose.model).toHaveBeenCalledWith("Books", stubSchema);
    expect(stubModel.create).toHaveBeenNthCalledWith(1, myBooks[0]);
    expect(stubModel.create).toHaveBeenNthCalledWith(2, myBooks[1]);
  });

  test("#2 only books on stock", (done) => {
    // SETUP
    let stubSchema = jest.fn();
    let stubDb = [
      { title: "Mariannengraben", ISBN: "9783847900429", stock: 321 },
      { title: "Factfulness", ISBN: "9783550081828", stock: 5 },
    ];
    let stubModel = { find: jest.fn((query) => Promise.resolve(stubDb)) };
    const mongoose = {
      model: jest.fn((name, schema) => stubModel),
      Schema: jest.fn((definition) => stubSchema),
    };

    // TASK:
    // Definiere Schema und Model der Bücher wie wie in #1.
    // Gib alle Bücher zurück die auf Lager sind (stock > 0).
    // Hinweis: du brauchst mongoose.Schema, mongoose.model und find()
    // Die Einträge in der Datenbank sehen so aus:
    // { title: "Mariannengraben", ISBN: "9783847900429", stock: 321 },
    // { title: "Factfulness", ISBN: "9783550081828", stock: 5 },
    // { title: "Rapunzel", ISBN: "97835500812128", stock: 0 }, <== nicht auf Lager

    function getAllBooksOnStock() {
      // YOUR SOLUTION
      // Erstelle zuerst das Schema, dann das Model. Die Aufgabe ist gelöst wenn du alle Books über .create() erstellt hast.
      const schema = new mongoose.Schema({
        title: String,
        ISBN: String,
        stock: Number,
      });

      const model = mongoose.model("Books", schema);

      return model.find({ stock: { $gt: 0 } }); // bearbeite diese Zeile bis der Test grün ist. Sie muss mit "return" anfangen.
      // DONT CHANGE THE NEXT LINES
    }

    getAllBooksOnStock().then((booksOnStock) => {
      expect(booksOnStock).toEqual(stubDb);
      done();
    });
    expect(mongoose.Schema).toHaveBeenCalledWith({
      title: String,
      ISBN: String,
      stock: Number,
    });
    expect(mongoose.model).toHaveBeenCalledWith("Books", stubSchema);
    expect(stubModel.find).toHaveBeenCalled();
    expect(stubModel.find.mock.calls[0][0]).toEqual({ stock: { $gt: 0 } });
  });
});
