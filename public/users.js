const submitButton = document.getElementById("submit");
const loadButton = document.getElementById("load");
const nameInput = document.getElementById("username");
const userlist = document.getElementById("userlist");
// Freitag:
const messagelist = document.getElementById("messagelist");
const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");

// "/messages" laden (über fetch) und die Antwort in messagelist schreiben
function loadMessages() {
  fetch("/messages", { method: "GET" })
    .then((response) => response.json())
    .then((messages) => {
      messagelist.innerText = "";

      messages.forEach((message) => {
        messagelist.innerText += `${message.sender} sagt: ${message.text}\n`;
      });
    }); // messages = [{ text: 'Hallo', sender: 'Alfons' }]
}
setInterval(loadMessages, 2000);

sendButton.addEventListener("click", () => {
  const message = { sender: nameInput.value, text: messageInput.value };
  fetch("/message", {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 401) {
      response.text().then(responseBody => alert(responseBody));
    }
  });
});


// REGISTER USER
submitButton.addEventListener("click", () => {
  const username = nameInput.value;

  // `localhost:3000/register?name=${username}`
  fetch(`http://localhost:3000/register?name=${username}`)
    .then((s) => s.text())
    .then((responseText) => console.log(responseText));
});

loadButton.addEventListener("click", () => {
  // url aufrufen: /list
  // die response zu text transformieren
  // den response text in userlist darstellen
  fetch(`/list`) // Brief
    .then((response) => {
      // Brief von Außen: Adresse sichtbar
      return response.text(); // Inhalt vom Brief
    })
    .then((responseText) => {
      userlist.innerHTML = responseText; // innerHTML => <br> wird ausgewertet
    });
});
