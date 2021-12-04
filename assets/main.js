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
let baseUrl_city = `https://api.teleport.org/api/cities/?search=`;

// Events
city.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    pageUp(city.value);
  }
});

city.addEventListener("input", async (e) => {
  let url = `${baseUrl_city}${city.value}`;
  let response = await (await fetch(url)).json();
  suggestions.innerHTML = "";
  let cities = response._embedded["city:search-results"];
  let length = cities.length > 5 ? 5 : cities.length;
  for (let i = 0; i < length; i++) {
    suggestions.insertAdjacentHTML(
      "afterbegin",
      `<option value="${cities[i].matching_full_name}"></option>`
    );
  }
});

// Functions

let weatherCityForcast = async (city) => {
  let cityString = stringCity(city);
  let url = baseUrl_forcast + `&q=${cityString}`;
  let weather = await (await fetch(url)).json();
  let list_forcast = weather.list;
  let array_forcast = [];

  list_forcast.forEach((day) => {
    let days = new Date(day.dt_txt.replace(" ", "T"));
    let hours = days.getHours();
    if (hours === 0) {
      array_forcast.push(day);
    }
  });
  return array_forcast;
};

let weatherCity = async (city) => {
  let cityString = stringCity(city);
  let url = baseUrl + `&q=${cityString}`;
  let response = await fetch(url);
  if (response.status !== 200) {
    alert("City not found!");
    return;
  }
  let weather = await response.json();
  return weather;
};

let updateWeatherForcast = (days) => {
  forcasts.innerHTML = "";
  days.forEach((arr_day) => {
    forcasts.insertAdjacentHTML(
      "beforeend",
      `<article class="weather_forcast">
          <figure class="weather_img_f"> ${updateIcon(arr_day.weather[0].id)}
          </figure>
          <h3 class="weather_day_f">${dayOfWeek(arr_day.dt * 1000)}</h3>
          <div class="temperature_f"><span class="value">${
            arr_day.main.temp > 0 ? "+" + arr_day.main.temp : arr_day.main.temp
          }</span>&deg;C</div>
      </article>`
    );
  });
};

let updateWeather = (data) => {
  city_title.textContent = `${data.name} ,${data.sys.country}`;
  day.textContent = dayOfWeek(data.dt * 1000);
  humidity.textContent = data.main.humidity;
  pressure.textContent = data.main.pressure;
  wind.textContent = `${windDitection(data.wind.deg)}, ${data.wind.speed}`;
  temperature.textContent = `${
    data.main.temp > 0 ? "+" + data.main.temp : data.main.temp
  }`;
  weather_icon.innerHTML = updateIcon(data.weather[0].id);
};

let dayOfWeek = (time) => {
  return new Date(time).toLocaleDateString("en-EN", { weekday: "long" });
};

let windDitection = (deg) => {
  let direction;
  if (deg < 45 && deg >= 315) {
    direction = "North";
  } else if (deg > 45 && deg <= 135) {
    direction = "East";
  } else if (deg > 135 && deg <= 225) {
    direction = "South";
  } else {
    direction = "South";
  }
  return direction;
};

let updateIcon = (ico) => {
  let icon;
  // Thunderstorm
  if (ico >= 200 && ico <= 232) {
    icon = `<span class="iconify" data-icon="icon-park:thunderstorm-one"></span>`;
    // Drizzle
  } else if (ico >= 300 && ico <= 321) {
    icon = `<span class="iconify" data-icon="fluent:weather-drizzle-20-filled" style="color: #114A79;"></span>`;
    // Rain
  } else if (ico >= 500 && ico <= 531) {
    icon = `<span class="iconify" data-icon="carbon:rain-drop" style="color: #5aa9e9;"></span>`;
    // Snow
  } else if (ico >= 600 && ico <= 622) {
    icon = `<span class="iconify" data-icon="carbon:snow" style="color: #cee5fd;"></span>`;
    // Atmosphere
  } else if (ico >= 701 && ico <= 781) {
    icon = `<span class="iconify" data-icon="ri:mist-fill" style="color: #c8cac8;"></span>`;
    // Clear
  } else if (ico === 800) {
    icon = `<span class="iconify" data-icon="fluent:weather-sunny-16-filled" style="color: yellow;"></span>`;
    // Clouds
  } else if (ico >= 801 && ico <= 804) {
    icon = `<span class="iconify" data-icon="bi:clouds-fill" style="color: #c8cac8;"></span>
    `;
  }
  return icon;
};

let pageUp = async (city) => {
  let city_input = await weatherCity(city);
  if (!city_input) {
    return;
  }
  let city_input_forcast = await weatherCityForcast(city);
  updateWeather(city_input);
  updateWeatherForcast(city_input_forcast);
};

let stringCity = (city) => {
  let cityString;
  if (city.includes(",")) {
    cityString =
      city.substring(0, city.indexOf(",")) +
      city.substring(city.lastIndexOf(","));
  } else {
    cityString = city;
  }
  return cityString
}

pageUp("Tehran");