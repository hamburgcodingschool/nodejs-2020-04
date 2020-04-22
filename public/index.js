
let map;
const places = [];
const markers = [];
const infoWindows = [];
const mapDiv = document.getElementById("map");
const logOutButton = document.getElementById("logOutButton");

const db = firebase.firestore();

db.collection("posts")
  .get()
  .then((posts) => {
    posts.forEach((post) => {
      const json = post.data();
      const postHtml = createPostHtml(json);

      const marker = new google.maps.Marker({
        position: getPosition(json),
        map: map,
        animation: google.maps.Animation.DROP,
        title: `${json.title}`
      });

      markers.push(marker);

      marker.addListener("click", () => {
        closeInfoWindows();
        infoWindow.open(map, marker);
        map.setZoom(5);
        map.setCenter(marker.getPosition());
      });

      const infoWindow = new google.maps.InfoWindow({
        content: postHtml,
      });

      infoWindows.push(infoWindow);
    });
  });

function initMap() {
  map = new google.maps.Map(mapDiv, {
    center: { lat: 0, lng: 0 },
    zoom: 3,
  });

  map.addListener("click", () => {
    closeInfoWindows();
    zoomInOnAllPlaces();
  });

  map.addListener("rightclick", showAddressOnRightClick);
}

const zoomInOnAllPlaces = () => {
  const bounds = new google.maps.LatLngBounds();
  markers.forEach(location => {
    bounds.extend(location.getPosition());
  });
  map.fitBounds(bounds);
}

const showAddressOnRightClick = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  // set new marker
  // write lat and lng into form fields
  // show note to fill in form for new marker
  console.log("Lat=" + lat + "; Lng=" + lng);
};

const closeInfoWindows = () => {
  for (let i = 0; i < infoWindows.length; i++) {
    const infoWindow = infoWindows[i];
    infoWindow.close();
  }
};

const getPosition = (place) => {
  return { lat: place.location.lat, lng: place.location.lng };
};

const createPostHtml = (onePlace) => {
  const html = `<img class="w-64" src="${
    onePlace.image ? onePlace.image.src : ""
  }" alt="${onePlace.image ? onePlace.image.alt : ""}">
  <div class="px-6 py-4 box-border w-64">
    <div class="font-bold text-xl mb-2">${onePlace.title}</div>
    <p class="text-gray-700 text-base">
      ${onePlace.text}
    </p>
  </div>
  <div class="px-6 py-4 flex items-center w-64 box-border">
    <img class="w-10 h-10 rounded-full mr-4" src="${
      onePlace.author_image ? onePlace.author_image : ""
    }" alt="${onePlace.author ? onePlace.author : ""}">
    <div class="text-sm">
      <p class="text-gray-900 leading-none">${onePlace.author}</p>
      <p class="text-gray-600">${
        onePlace.date.toDate
          ? onePlace.date.toDate().toDateString()
          : onePlace.date
      }</p>
    </div>
  </div>
  <div class="px-6 py-4">${onePlace.location.city}, ${
    onePlace.location.country
  }</div>`;
  return html;
};

// Authentication
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log("logged in");

    document.getElementById("loginButton").classList.remove("flex");
    document.getElementById("loginButton").classList.add("hidden");

    document.getElementById("userSign").classList.remove("hidden");
    document.getElementById("userSign").classList.add("flex");

    document.getElementById("logOutButton").classList.remove("hidden");
    document.getElementById("logOutButton").classList.add("flex");

  } else {
    // No user is signed in.
    console.log("logged out");

    document.getElementById("userSign").classList.add("hidden");
    document.getElementById("userSign").classList.remove("flex");
  }
});

const logout = () => {
  firebase.auth().signOut().then(function() {
    location.reload(true);
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
    console.log("logout not successful")
  });
  }

  logOutButton.addEventListener("click", logout);

