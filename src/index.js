document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById("cityInput").value.trim();
  
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
  
    // Redirects to results page with city name in the URL
    window.location.href = `results.html?city=${encodeURIComponent(city)}`;
  });