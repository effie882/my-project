const apiKey = "a646eb69bc287c86d96ed970ce62526b6";
const weatherInfo = document.getElementById("weatherInfo");

const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city");

if (!city) {
  weatherInfo.innerHTML = "<p>No city provided.</p>";
} else {
  const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (!data.current) {
        weatherInfo.innerHTML = `<p>Could not find weather for "${city}".</p>`;
        return;
      }

      const weatherHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>🌡️ Temperature:</strong> ${data.current.temperature}°C</p>
        <p><strong>🌤️ Condition:</strong> ${data.current.weather_descriptions[0]}</p>
        <img src="${data.current.weather_icons[0]}" alt="Weather Icon">
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}