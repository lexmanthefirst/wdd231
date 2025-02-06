import { places } from "./places.mjs";
import { app } from "./app.mjs";

const placeWrapper = document.querySelector(".place-wrapper");
places.forEach(function (place) {
  const placeCard = document.createElement("div");
  placeCard.classList.add("place-card");
  placeCard.innerHTML = `
        <h2>${place.name}</h2>
        <p>${place.description}</p>
        <address>${place.address}</address>
        <img src="images/${place.photo[0]}" alt="${place.photo[1]}" loading="${place.photo[2]}">
        `;
  placeWrapper.appendChild(placeCard);
});

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
});
