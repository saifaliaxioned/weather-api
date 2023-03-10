const apiKey = 'e2ee9ad2eb29f4a7f86758f6e0395c6d',
  cityForm = document.querySelector('.city-form'),
  cityName = document.querySelector('.city-input'),
  currentDay = document.querySelector('.day'),
  date = document.querySelector('.date'),
  dateMonth = document.querySelector('.date-month'),
  weatherIcon = document.querySelector('.icon img'),
  cityHumidity = document.querySelector('.humidity'),
  cityWind = document.querySelector('.wind'),
  inputError = document.querySelector('.input-error'),
  inputGroup = document.querySelector('.input-group'),
  weatherContainer = document.querySelector('.weather-container');
let span;

const fetchData = (url, err) => {
  fetch(url).then((response) => {
    if (response.status === 404) {
      throw err;
    } else {
      if (span) {
        span.remove();
        // weatherContainer.classList.remove('hide-content');
      }
      return response.json();
    }
  }).then((data) => {
    showData(data);
  }).catch((error) => {
    // weatherContainer.classList.add('hide-content');
    span = document.createElement('span');
    span.classList.add('input-error');
    span.innerHTML = `<span class="input-error">${error}</span>`;
    inputGroup.appendChild(span);
  });
}

const initialData = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`, `Oops! file not found`);
}

const userLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initialData);
  }
}

// window.onload = userLocation;
userLocation();

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`, 'There are problem with request, please enter proper city name!');
});

const showData = (data) => {
  const day = new Date().toLocaleString("en", { weekday: 'long' }),
    date = new Date().getDate(),
    month = new Date().toLocaleString('default', { month: 'short' }),
    iconCode = data.weather[0].icon;

  weatherContainer.innerHTML = `<ul class="today-date">
  <li><span class="day">${day}</span></li>
  <li><span class="date"></span>${date} <span class="date-month">${month}</span></li>
  </ul>
  <div class="weather-content">
  <h3 class="city-name">${data.name}</h3>
    <div class="degree-content">
    <h4 class="degree">${data.main.temp}°C</h4>
    <figure class="icon">
      <img src="http://openweathermap.org/img/w/${iconCode}.png" alt="">
    </figure>
    </div>
    <ul class="wind-content">
      <li class="humidity">${data.main.humidity}% </li>
      <li class="wind">${data.wind.speed}km/h</li>
      <li class="deg">${data.wind.deg}</li>
    </ul>
  </div>`;
}
