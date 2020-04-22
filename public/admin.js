const db = firebase.firestore();

const content = document.getElementById("content");

db.collection("posts")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((post) => {
      const json = post.data();
      const html = createBlogPostHtml(json);
      const div = document.createElement("div");
      div.innerHTML = html;
      const cityName = json.location.city;
      content.append(div.firstChild);
    });
  });

// Submit a new blog post
const submitNewBlogPost = (e) => {
  e.preventDefault();
  // get values from form
  const title = document.getElementById("title").value;
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  const description = document.getElementById("description").value;
  const latitudeElement = document.getElementById("lat");
  const latitude = +latitudeElement.value;
  const longitudeElement = document.getElementById("lng");
  const longitude = +longitudeElement.value;
  const imagesrc = document.getElementById("imagesrc").value;
  console.log(
    `Title = ${title}, Text = ${description}, City = ${city}, Country = ${country}, Lat = ${latitude}, Lng = ${longitude}, ImageSrc = ${imagesrc}`
  );
  const date = new Date();
  // send to Firestore
  db.collection("posts")
    .add({
      title: title,
      text: description,
      location: {
        city: city,
        country: country,
        lat: latitude,
        lng: longitude,
      },
      image: {
        src: "/img/" + imagesrc,
        alt: title,
      },
      date: date,
      author: "Clemens_B",
      author_image: "img/icon_cm--portugal.jpg",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      // reload after sending to empty form and load new blog
      location.reload(true)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const newSubmit = document.getElementById("submitNewBlogPost");
newSubmit.addEventListener("submit", submitNewBlogPost);

// Create HTML for Blog Posts
const createBlogPostHtml = (post) => {
  return `<div class="container max-w-sm rounded overflow-hidden shadow-lg justify-center bg-white m-6">
  <img class="w-full" src="${post.image ? post.image.src : ""}" alt="${
    post.image ? post.image.alt : ""
  }">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">${post.title}</div>
    <p class="text-gray-700 text-base">
      ${post.text}
    </p>
  </div>
  <div class="px-6 py-4 flex items-center">
    <img class="w-10 h-10 rounded-full mr-4" src="${
      post.author_image ? post.author_image : ""
    }" alt="${post.author ? post.author : ""}">
    <div class="text-sm">
      <p class="text-gray-900 leading-none">${post.author}</p>
      <p class="text-gray-600">${
        post.date.toDate ? post.date.toDate().toDateString() : post.date
      }</p>
    </div>
  </div>
  <div class="px-6 py-4">${post.location.city}, ${post.location.country}</div>
</div>`;
};

// Redirect to index.html if user is not logged in
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log("logged in");
    
  } else {
    // No user is signed in.
    console.log("logged out");
    
    window.location.href = "index.html";
  }
});