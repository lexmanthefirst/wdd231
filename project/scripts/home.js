import { app } from "./app.mjs";
document.addEventListener("DOMContentLoaded", function () {
  app();
});

// theme-toggle.js
const themeBtn = document.getElementById("theme-btn");
document.documentElement.classList.toggle(
  "dark-theme",
  localStorage.getItem("theme") === "dark"
);



const toggleTheme = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "light" : "dark"
  );
  localStorage.setItem("theme", isDark ? "light" : "dark");
  themeBtn.textContent = isDark ? "🌙" : "☀️";
};

themeBtn.addEventListener("click", toggleTheme);