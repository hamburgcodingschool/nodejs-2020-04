describe("async/await", () => {
  /*
    Um diese Tests auszuführen entferne das x vor xtest()  bei dem Test den du ausführen möchtest (Zeile 11, 35, ...)
    Die Tests werden dann automatisch ausgeführt (wenn `npm t` noch läuft) und du kannst mit der Lösung loslegen

    Async Await ist eine alternative schreibweise um mit Promises umzugehen.

  */

  xtest("#1 rewrite fetch", async () => {
    // SETUP
    stubResponse = JSON.stringify({ text: "Hallo!", sender: "Alfons" });
    const { fetch } = setupFetchMock(stubResponse);

    const resolving = async () => {
      // TASK:
      // Schreibe den folgenden Code von Promise (then) auf await/async um.

      // YOUR SOLUTION
      return fetch("/messages")
        .then((response) => response.text())
        .then((text) => text);


      // DONT CHANGE THE NEXT LINES
    };

    const s = await resolving();
    expect(s).toBe(stubResponse);
    expect(fetch).toHaveBeenCalledWith("/messages");
    expect(resolving.toString()).not.toMatch(/\.then\(/);
    expect(resolving.toString()).toMatch(/await /);
  });

  xtest("#2 async function", async () => {
    const messageMock = { remove: jest.fn(() => Promise.resolve()) };
    const MessageModel = {
      findById: jest.fn((messageId) => Promise.resolve(messageMock)),
    };

    const resolving = () => {
      // TASK:
      // Benutze await/async anstatt von then

      // YOUR SOLUTION
      function deleteMessage(messageId) {
        MessageModel.findById(messageId).then((message) => {
          message.remove();
        });
      }

      // DONT CHANGE THE NEXT LINE
      deleteMessage("some-message-id");
    };

    await resolving();
    expect(MessageModel.findById).toHaveBeenCalledTimes(1);
    expect(MessageModel.findById).toHaveBeenCalledWith("some-message-id");
    expect(messageMock.remove).toHaveBeenCalledTimes(1);
    expect(resolving.toString()).not.toMatch(/\.then\(/);
    expect(resolving.toString()).toMatch(/await /);
  });

  xtest("#3 multiple times", async () => {
    const messageMock = {
      userId: "some-user-id",
      remove: jest.fn(() => Promise.resolve()),
    };
    const MessageModel = {
      findById: jest.fn((messageId) => Promise.resolve(messageMock)),
    };

    const userMock = { remove: jest.fn(() => Promise.resolve()) };
    const UserModel = {
      findById: jest.fn((userId) => Promise.resolve(userMock)),
    };

    // TASK:
    // Benutze await/async anstatt von then

    // YOUR SOLUTION
    function deleteMessageAndUser(messageId) {
      return MessageModel.findById(messageId).then((message) => {
        return UserModel.findById(message.userId).then((user) => {
          message.remove();
          user.remove();
        });
      });
    }

    // DONT CHANGE THE NEXT LINE
    await deleteMessageAndUser("some-message-id");

    expect(MessageModel.findById).toHaveBeenCalledTimes(1);
    expect(MessageModel.findById).toHaveBeenCalledWith("some-message-id");
    expect(messageMock.remove).toHaveBeenCalledTimes(1);
    expect(UserModel.findById).toHaveBeenCalledWith("some-user-id");
    expect(userMock.remove).toHaveBeenCalledTimes(1);
    expect(deleteMessageAndUser.toString()).not.toMatch(/\.then\(/);
    expect(deleteMessageAndUser.toString()).toMatch(/await /);
  });

  xtest("#4 back to then", async () => {
    const messageMock = {
      userId: "some-user-id",
      likes: 13,
      save: jest.fn(() => Promise.resolve()),
    };
    const MessageModel = {
      findById: jest.fn((messageId) => Promise.resolve(messageMock)),
    };
    const userMock = {
      isAdmin: true,
      remove: jest.fn(() => Promise.resolve()),
    };
    const UserModel = {
      findById: jest.fn((userId) => Promise.resolve(userMock)),
    };

    // TASK:
    // Umgekehrt! Benutze then statt async/await
    // Hinweis: es ist wichtig, dass du darauf wartest dass .save() ausgeführt wird und du dann true zurückgibst.

    // YOUR SOLUTION
    async function likeIfUserIsAdmin(messageId) {
      const message = await MessageModel.findById(messageId);
      const user = await UserModel.findById(message.userId);
      if (user.isAdmin) {
        message.likes += 1;
        await message.save();
        return true;
      }
    }


    // DONT CHANGE THE NEXT LINE
    const result = await likeIfUserIsAdmin("some-message-id");

    expect(MessageModel.findById).toHaveBeenCalledTimes(1);
    expect(MessageModel.findById).toHaveBeenCalledWith("some-message-id");
    expect(messageMock.likes).toEqual(14);
    expect(messageMock.save).toHaveBeenCalledTimes(1);
    expect(UserModel.findById).toHaveBeenCalledWith("some-user-id");
    expect(result).toBe(true);
    expect(likeIfUserIsAdmin.toString()).toMatch(/\.then\(/);
    expect(likeIfUserIsAdmin.toString()).not.toMatch(/await /);
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
