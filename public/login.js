
const login = (event) => {
  event.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const div = document.createElement("div");
      div.innerHTML = `<p class="text-red-700 mt-8">Username and password don't match.</p>`;
      document.getElementById("loginForm").append(div.firstChild);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

document.getElementById("loginForm").addEventListener("submit", login);
