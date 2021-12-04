// Variables
let city = document.querySelector("#input_city");
let city_title = document.querySelector(".weather_city");
let day = document.querySelector(".weather_day");
let humidity = document.querySelector(".weather_humidity>.value");
let wind = document.querySelector(".weather_wind>.value");
let pressure = document.querySelector(".weather_pressure>.value");
let temperature = document.querySelector(".temperature>.value");
let forcasts = document.querySelector(".weather_forcast_all");
let weather_icon = document.querySelector(".weather_img");
let suggestions = document.querySelector("#suggestion");
let keyAPI = `2c05e25a4032e7e137acb3ad30635b7a`;
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${keyAPI}&units=metric`;
let baseUrl_forcast = `https://api.openweathermap.org/data/2.5/forecast?appid=${keyAPI}&units=metric`;
let baseUrl_city = `https://api.teleport.org/api/cities/?search= `;

