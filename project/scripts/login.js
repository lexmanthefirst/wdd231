const darkMode = () => {
    const themeBtn = document.getElementById("theme-btn");
    const root = document.documentElement;
  
    // Function to set the theme
    function setTheme(theme) {
      root.dataset.theme = theme;
      localStorage.setItem("theme", theme);
      themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  
    // Toggle theme on button click
    function toggleTheme() {
      const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    }
  
    // Set theme on page load
    document.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    });
  
    // Add event listener to button
    themeBtn.addEventListener("click", toggleTheme);
  };

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
        greeting.textContent =  `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
      }
    }
    localStorage.setItem("lastVisit", now.toString());
  }
  darkMode();