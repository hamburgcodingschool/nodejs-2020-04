describe("fetch", () => {
  /*
    Um diese Tests auszuführen entferne das x vor xtest()  bei dem Test den du ausführen möchtest (Zeile 11, 35, ...)
    Die Tests werden dann automatisch ausgeführt (wenn `npm t` noch läuft) und du kannst mit der Lösung loslegen

    fetch(url, options) startet einen HTTP Request an einen Server.
    Wenn fetch('/admin') ausgeführt wird, gibt es eine Promise zurück, die die Antwort vom Server als Parameter erhält.
  */

  xtest("#1 fetch /messages", async () => {
    // SETUP
    stubResponse = JSON.stringify({ text: "Hallo!", sender: "Alfons" });
    const { fetch } = setupFetchMock(stubResponse);

    const resolving = async () => {
      // TASK:
      // Get all Messages from the /messages route and return them.

      // YOUR SOLUTION
      // start with return fetch(...)

      return fetch(/* TODO: CHANGE THIS */);

      // DONT CHANGE THE NEXT LINE
    };

    const s = await resolving();
    expect(s).toBe(stubResponse);
    expect(fetch).toHaveBeenCalledWith("/messages");
  });

  xtest("#2 fetch post", async () => {
    const { fetch } = setupFetchMock(null);

    const resolving = async () => {
      // TASK:
      // Do a POST request to the /admin route and send { enabled: true} as post body

      // YOUR SOLUTION
      // start with return fetch(...)

      return fetch(/* TODO: CHANGE THIS */);

      // DONT CHANGE THE NEXT LINE
    };

    await resolving();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("/admin");
    expect(fetch.mock.calls[0][1]).toEqual({body: '{"enabled":true}', method: "POST"});
  });

  test("#3 fetch post", async () => {
    const { fetch } = setupFetchMock(null);

    const resolving = async () => {
      // TASK:
      // Do a POST request to the /blogpost route and send { title: "Yesterday", text: "Every trouble seemed so far away" } as post body
      // and the correct header for the given format

      // YOUR SOLUTION
      // start with return fetch(...)

      return fetch(/* TODO: SOLVE THIS */);

      // DONT CHANGE THE NEXT LINE
    };

    await resolving();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("/blogpost");
    expect(fetch.mock.calls[0][1]).toEqual({body: '{"title":"Yesterday","text":"Every trouble seemed so far away"}', method: "POST", headers: { 'Content-Type': 'application/json' }});
  });
});

// SETUP
let stubResponse;

function setupFetchMock(response) {
  const fetchText = jest.fn(
    () => new Promise((resolve, reject) => resolve(stubResponse))
  );
  const fetchJson = jest.fn(
    () => new Promise((resolve, reject) => resolve(stubResponse))
  );

  const httpResponse = {
    text: fetchText,
    json: fetchJson,
  };

  const fetch = jest.fn(
    (url, options) => new Promise((resolve, reject) => resolve(httpResponse))
  );
  return { fetch, fetchText, fetchJson };
}
