import {app} from './app.mjs';

async function dispatchEvent(){
  try{
    const response = await fetch("data/events.json");
    if (!response.ok) throw new Error ("Failed to fetch events data");

    const events = await response.json();
    const eventsCarousel = document.getElementById("events-carousel");

    events.forEach(event =>{
      const eventCard = document.createElement("div");
      eventCard.classList.add("event-card");

      eventCard.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${event.time}</p>
    

      `;
      eventsCarousel.appendChild(eventCard);
    });

    setupCarousel();

  } catch(error){
    console.error(error);
    const eventsCarousel = document.getElementById('events-Carousel");');
    eventsCarousel.textContent = "Failed to load events";
  }
}

function setupCarousel(){
  const carousel = document.getElementById('events-carousel');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  const scrollAmount = 300;

  prevBtn.addEventListener('click', ()=>{
carousel.scrollBy({left: -scrollAmount, behavior: 'smooth'});
  });

  nextBtn.addEventListener('click', ()=>{
    carousel.scrollBy({left: scrollAmount, behavior: 'smooth'});
  });

  function checkScroll() {
    prevBtn.disabled = carousel.scrollLeft === 0;
    nextBtn.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth;
  }

  carousel.addEventListener('scroll', checkScroll);
  checkScroll();

  setInterval(() => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  }, 5000); // Scrolls every 5 seconds
  
  setInterval(() => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  }, 10000); // Scrolls back every 10 seconds
}



// Fetch current weather data
async function fetchWeather() {
  const apiKey = '90158c8799bb28ca5c3054efdcbe85fd'; // Replace with your OpenWeatherMap API key
  const city = 'Port Harcourt';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();

    const weatherInfo = `
    <div class="weather-card">
      <h3>Current Weather in Port Harcourt:</h3>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description} icon">
    
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `;

    document.getElementById("weather-info").innerHTML = weatherInfo;
  } catch (error) {
    console.error(error);
    document.getElementById("weather-info").textContent = "Unable to fetch weather data.";
  }
}

// Fetch three-day weather forecast
async function fetchWeatherForecast() {
  const apiKey = '90158c8799bb28ca5c3054efdcbe85fd'; // Replace with your OpenWeatherMap API key
  const city = 'Panama City';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather forecast');
    const data = await response.json();

    const forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-card');
    forecastInfo.innerHTML = '<h3>3-Day Forecast:</h3>';

    // Process the forecast for the next 3 days (8 entries/day, each entry represents 3 hours)
    const threeDayForecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);

    threeDayForecast.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long' });
      const forecastHTML = `
        <div class="forecast-day">
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description} icon">
          <p><strong>${date}:</strong> 
          ${day.main.temp}°C, ${day.weather[0].description}</P>
        </div>
      `;
      forecastInfo.innerHTML += forecastHTML;
    });

    document.getElementById("weather-info").appendChild(forecastInfo);
  } catch (error) {
    console.error(error);
    document.getElementById("weather-info").textContent = "Unable to fetch weather forecast.";
  }
}

// Display spotlight members
async function displaySpotlights() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  const spotlights = members.filter(member => member.Membership === "Gold" || member.Membership === "Silver");

  // Shuffle and pick 2-3 random members
  const selected = spotlights.sort(() => 0.5 - Math.random()).slice(0, 3);

  const spotlightContainer = document.getElementById("spotlight-container");
  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.logo}" alt="${member.Name} logo">
      <h3>${member.Name}</h3>
      <p><strong>Phone:</strong> ${member.Phone}</p>
    
      <p><strong>Email:</strong> <a href="${member.Email}" target="_blank">${member.Email}</a></p>
      <p><strong>Membership:</strong> ${member.Membership}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  app();
  dispatchEvent();
  fetchWeather();
  fetchWeatherForecast();
  displaySpotlights();
  // setupCarousel();
});
