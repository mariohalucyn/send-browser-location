import axios from "axios";

const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!("geolocation" in navigator)) {
    return write("Geolocation is not available");
  }

  try {
    const position = await getCurrentLocation();
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const res = await axios.post("http://localhost:8000/location", location, {
      headers: { "Content-Type": "application/json" },
    });

    write(res.data);
  } catch (error) {
    write("Failed to retrieve location: " + error.message);
  }
});

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function write(message) {
  console.log(message);
}
