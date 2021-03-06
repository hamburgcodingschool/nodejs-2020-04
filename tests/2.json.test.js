describe('JSON.stringify', () => {
  /*
    Um diese Tests auszuführen entferne das x vor xtest()  bei dem Test den du ausführen möchtest (Zeile 15, 25, ...)
    Die Tests werden dann automatisch ausgeführt (wenn `npm t` noch läuft) und du kannst mit der Lösung loslegen

    JSON.stringify() erhält ein JavaScript Object als Parameter und wandelt dies in eine String um.
    Beispiel: JSON.stringify({a: 'test'}) ergibt '{ "a": "test"}'

    Dies ermöglicht uns JavaScript Datenstrukturen als String (Zeichenkette) umzuwandeln,
    sodass wir sie in eine Datei schreiben können oder an einen Server senden können.

    JSON.stringify() ist das Gegenteil von JSON.parse()
  */

 xtest('#1 things!', () => {
    const something = {a: 'thing'};
    // YOUR SOLUTION

    const answer = null; // TODO: change this

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('{"a":"thing"}');
  });

  xtest('#2 changing stuff', () => {
    const something = {};
    // YOUR SOLUTION

    const answer = null; // TODO: change this

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('{"from":"nothing"}');
  });
})


describe('JSON.parse', () => {
  /*
    JSON.parse() erhält einen String als Parameter und wandelt ihn in ein JavaScript Object zurück
    Beispiel: JSON.parse('{ "a": "test"}') ergibt {a: 'test'}

    Wenn der Parameter sich nicht in ein JavaScript Object umwandeln lässt, wirft JSON.parse einen Fehler

    JSON.parse ist das Gegenteil von JSON.stringify
  */

  xtest('#1 use it!', () => {
    const requestBodyAsString = '{ "name": "Hans" }';
    // YOUR SOLUTION

    const answer = null; // TODO: change this

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('Hans');
  });

  xtest('#2 double use', () => {
    const requestAsString = '{ "body": { "name": "Hans" }}';
    // YOUR SOLUTION

    const answer = JSON.parse(requestAsString).body.name;

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('Hans');
  });

  xtest('#3 find him!', () => {
    const messagesAsString = '[{ "text": "Hi!", "sender": "Hans" },{ "text": "Jo!", "sender": "Marius" }]';
    // YOUR SOLUTION

    const answer = null; // TODO: change this

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('Marius');
  });

  xtest('BONUS #1 very deep', () => {
    const nested = '{"deep":"{\\"yes\\":\\"very\\"}"}';
    // YOUR SOLUTION

    const answer = null; // TODO: change this

    // DONT CHANGE THE NEXT LINE
    expect(answer).toBe('very');
  });
});
