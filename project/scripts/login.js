import { darkMode } from "./app.mjs";

// //Call darkMode function
darkMode();

  document.addEventListener("DOMContentLoaded", () => {
    displayGreeting();
  });
  
  function displayGreeting(){
    const greeting = document.querySelector(".welcome-text h1");
  
    if(!greeting) return;
  
    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date().getTime();
  
    if(!lastVisit){
      greeting.textContent = "Welcome";
    } else {
      const lastVisitDate = parseInt(lastVisit, 10);
      const timeDifference = now - lastVisitDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      if(daysDifference < 1) {
        greeting.textContent = "Welcome Back!"
      } else {
        greeting.textContent =  `You last logged in ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
      }
    }
    localStorage.setItem("lastVisit", now.toString());
  }