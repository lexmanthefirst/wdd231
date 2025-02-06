
export const app = () => {
    const menuBars = document.getElementById("menu-bars");
    const navElement = document.querySelector("nav");
  
    const getCopyrite = () => {
      const copyrightElement = document.getElementById("copywrite");
      const modifiedElement = document.getElementById("modified");
  
      copyrightElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved | Okhitoya Alex`;
      modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    };
    const toggleNav = () => {
      menuBars.classList.toggle("change");
      navElement.classList.toggle("open");
      const menuLinks = document.querySelector(".menuLinks");
      menuLinks.classList.toggle("open");
    };
  
    // Event Listener
    menuBars.addEventListener("click", toggleNav);
    getCopyrite();
  };