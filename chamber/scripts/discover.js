// Import modules
import { app } from "./app.mjs";


async function fecthPlaces(){
  try{
    const response = await fetch("data/places.json");
    if (!response.ok) throw new Error (`Failed to fetch places data. Status: ${response.status}`);
    const places = await response.json();
    displayPlaces(places);

  } catch (error) {
    console.error("Error fetching places data:", error);
  }
}

const displayPlaces = function(places){
  const placeWrapper = document.querySelector(".place-wrapper");
  places.forEach(function (place) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
        <h2>${place.name}</h2>
        <p>${place.description}</p>
        <address>${place.address}</address>
        <div class="image-container"><img src="images/${place.photo[0]}" alt="${place.photo[1]}" loading="${place.photo[2]}"></div>
        <a href="#" class="learn-more">Learn More</a>
        
        `;
    placeWrapper.appendChild(placeCard);
  });
}



function displayGreeting(){
  const greeting = document.querySelector(".greeting");

  if(!greeting) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date().getTime();

  if(!lastVisit){
    greeting.textContent = "Welcome to the Discover Page.";
  } else {
    const lastVisitDate = parseInt(lastVisit, 10);
    const timeDifference = now - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if(daysDifference < 1) {
      greeting.textContent = "Welcome Back"
    } else {
      greeting.textContent =  `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
    }
  }
  localStorage.setItem("lastVisit", now.toString());
}
    


document.addEventListener("DOMContentLoaded", () => {
  app();
  displayGreeting();
  fecthPlaces();
});
