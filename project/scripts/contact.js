import {toggleMenu} from "./app.mjs";
document.addEventListener("DOMContentLoaded", function (){
    toggleMenu();
});
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
darkMode();