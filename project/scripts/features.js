import {toggleMenu } from "./app.mjs";
// Scroll Animations
const featureCards = document.querySelectorAll(".feature-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.5 }
);

featureCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

async function fetchFeatures() {
  try {
    const response = await fetch("data/features.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const features = await response.json();
    displayFeatures(features);
  } catch (err) {
    console.error("Error fetching feature data:", err);
  }
}

function displayFeatures(features) {
  features.forEach((feature) => {
    const featureContainer = document.getElementById("features");
    const featureCard = document.createElement("div");
    featureCard.classList.add("feature-card");
    featureCard.innerHTML = `
     <div class="icon">${feature.icon}</div>
      <h2>${feature.title}</h2>
      <p>${feature.description}</p>
    `;
    featureContainer.appendChild(featureCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFeatures();
  toggleMenu();
  darkMode();
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
