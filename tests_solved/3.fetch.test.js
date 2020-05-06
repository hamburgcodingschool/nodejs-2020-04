describe("fetch", () => {
  /*
    fetch(url, options) startet einen HTTP Request an einen Server.
    Wenn fetch('/admin') ausgeführt wird, gibt es eine Promise zurück, die die Antwort vom Server als Parameter erhält.
  */

  test("#1 fetch /messages", async () => {
    // SETUP
    stubResponse = JSON.stringify({ text: "Hallo!", sender: "Alfons" });
    const { fetch } = setupFetchMock(stubResponse);

    const resolving = async () => {
      // TASK:
      // Get all Messages from the /messages route and return them.

      // YOUR SOLUTION
      // start with return fetch(...)

      return fetch("/messages")
        .then((response) => response.text())
        .then((text) => text);

      // DONT CHANGE THE NEXT LINE
    };

    const s = await resolving();
    expect(s).toBe(stubResponse);
    expect(fetch).toHaveBeenCalledWith("/messages");
  });

  test("#2 fetch post", async () => {
    const { fetch } = setupFetchMock(null);

    const resolving = async () => {
      // TASK:
      // Do a POST request to the /admin route and send { enabled: true} as post body

      // YOUR SOLUTION
      // start with return fetch(...)

      return fetch("/admin", {
        method: "post",
        body: JSON.stringify({ enabled: true }),
      });

      // DONT CHANGE THE NEXT LINE
    };

    await resolving();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("/admin");
    expect(fetch.mock.calls[0][1]).toEqual({body: '{"enabled":true}', method: "post"});
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
