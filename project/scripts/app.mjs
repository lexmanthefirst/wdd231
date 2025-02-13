
export const CopyWrite = () => {
    
  
    const getCopywrite = () => {
      const copyrightElement = document.getElementById("copywrite");
      const modifiedElement = document.getElementById("modified");
  
      copyrightElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved | Okhitoya Alex`;
      modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    };
   
    getCopywrite();
  };
 export const toggleMenu = ()=>{
  const menuBars = document.getElementById("menu-bars");
    const navElement = document.querySelector("nav");

  const toggleNav = () => {
    menuBars.classList.toggle("change");
    navElement.classList.toggle("open");
    const menuLinks = document.querySelector(".menuLinks");
    menuLinks.classList.toggle("open");
  };

  // Event Listener
  menuBars.addEventListener("click", toggleNav);
 
 }
  export const darkMode =  ()=>{
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
  }