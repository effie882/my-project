

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const weatherInfo = document.getElementById("weather-info");
const resultsDiv = document.getElementById("weather-results");
const toggleUnitBtn = document.getElementById("toggle-unit");

let isCelsius = true;
let latestData = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});


toggleUnitBtn.addEventListener("click", () => {
  if (latestData) {
    isCelsius = !isCelsius;
    displayWeather(latestData);
  }
});


function fetchWeather(city) {
  const accessKey = "24771eb7e27ac6713ab7127ecb57982d"; 
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodeURIComponent(city)}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        displayError("City not found. Try another.");
        return;
      }
      latestData = data;
      displayWeather(data);
    })
    .catch(() => {
      displayError("Something went wrong. Try again later.");
    });
}


function displayWeather(data) {
  const { temperature, weather_descriptions, wind_speed, humidity } = data.current;

  const temp = formatTemperature(temperature);
  const infoItems = [
    `Description: ${weather_descriptions[0]}`,
    `Temperature: ${temp}`,
    `Wind Speed: ${wind_speed} km/h`,
    `Humidity: ${humidity}%`
  ];

  cityName.textContent = data.location.name;
  weatherInfo.innerHTML = "";
  infoItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    weatherInfo.appendChild(li);
  });

  resultsDiv.classList.remove("hidden");
}


function formatTemperature(tempC) {
  return isCelsius
    ? `${tempC} °C`
    : `${(tempC * 9 / 5 + 32).toFixed(1)} °F`;
}

function displayError(message) {
  alert(message);
}



  