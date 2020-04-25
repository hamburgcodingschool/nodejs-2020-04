describe("Start", () => {
  /*
    Ein Test beschreibt eine Aufgabe. Wenn die Aufgabe richtig gelöst ist, ist der Test grün (PASS).
    Ohne Lösung sind die Tests rot (FAIL).

    Es müssen nur die Zeilen nach // YOUR SOLUTION geändert werden.
    Du kannst die Zeilen zwischen "// YOUR SOLUTION" und "// DONT CHANGE THE NEXT LINE" ändern wie du willst.

    Jeder Test beginnt mit der Aufgabenstellung (SETUP). Dann kommt deine Lösung (SOLUTION) und am Ende die Prüfung (CHECK).

    Lies dir den Code jedes Tests komplett durch, bevor du mit der Lösung anfängst.
    Du musst das Setup und die Prüfung verstehen, um die richtige Lösung zu finden.

    Um die Tests auszuführen, gib im Terminal folgenden Befehl ein: `npm t`
    Damit startet die Auswertung der Tests. Beim Speichern einer Datei werden die Tests automatisch erneut ausgeführt.

    Los gehts mit dem ersten Test!
  */

  test("#1", () => {
    // SETUP
    function sum(a, b) { return a + b; };
    // YOUR SOLUTION

    const answer = 0;

    // CHECK: DONT CHANGE THE NEXT LINE
    expect(sum(3, answer)).toBe(7);
  });

  // dieser Test wird nur ausgeführt wenn du das x vor test entfernst: test("#2", ...
  xtest("#2", () => {
    // YOUR SOLUTION

    const answer = (a) => a;

    // DONT CHANGE THE NEXT LINE
    expect(answer(2)).toBe(6);
    expect(answer(3)).toBe(9);
    expect(answer(4)).toBe(12);
  });
});
