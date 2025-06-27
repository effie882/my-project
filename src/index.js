const apiKey = a5274803efbfbc70ec6298b00c0f4726 
const button =document.getElementById("getWeatherBtn");

button.addEventListener('click',()=>{
    const city = document.getElementById('cityInput').value;
    if(city){
        getWeather(city);
    }
});
