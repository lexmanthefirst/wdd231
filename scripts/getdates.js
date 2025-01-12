document.addEventListener("DOMContentLoaded", () => {
    // Update Footer with Copyright Year and Last Modified Date
    const copyrightElement = document.getElementById("copywrite");
    const modifiedElement = document.getElementById("modified");
  
    copyrightElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved | Okhitoya Alex`;
    modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  
  });