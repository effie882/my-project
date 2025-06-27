const apiKey = "a664eb69bc287c8d96ed970ce62562b6"; 

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.success === false || !data.current) {
        weatherInfo.innerHTML = `<p>Could not find weather for "${city}".</p>`;
        return;
      }

      const weatherHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temperature}°C</p>
        <p>Weather: ${data.current.weather_descriptions[0]}</p>
        <img src="${data.current.weather_icons[0]}" alt="Weather Icon">
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}