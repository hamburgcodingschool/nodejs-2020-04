const submitButton = document.getElementById('submit');
const loadButton = document.getElementById('load');
const nameInput = document.getElementById('username');
const userlist = document.getElementById('userlist');

submitButton.addEventListener('click', () => {
  const username = nameInput.value;

  // `localhost:3000/register?name=${username}`
  fetch(`http://localhost:3000/register?name=${username}`)
    .then((s) => s.text())
    .then((responseText) => console.log(responseText));
});

loadButton.addEventListener('click', () => {
  // url aufrufen: /list
  // die response zu text transformieren
  // den response text in userlist darstellen
  fetch(`/list`) // Brief
    .then(response => { // Brief von Außen: Adresse sichtbar
      return response.text(); // Inhalt vom Brief
    })
    .then((responseText) => {
      userlist.innerHTML = responseText; // innerHTML => <br> wird ausgewertet
    });
});
