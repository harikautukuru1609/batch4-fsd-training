const API_KEY = "1bc0a85da56e441b1f5c2ea3b2e7ab18";

async function searchWeather() {

  const city = document
    .getElementById("cityInput")
    .value
    .trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  showLoading(true);
  hideError();

  try {

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&appid=${API_KEY}` +
      `&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found.");
    }

    const data = await response.json();

    updateWeather(data);
    generateTravelDashboard(data);

  } catch (error) {

    console.error(error);

    showError(
      "Unable to get weather data. Please check the city name or API key."
    );

  } finally {

    showLoading(false);
  }
}


/* =========================
   UPDATE WEATHER
========================= */

function updateWeather(data) {

  const temperature =
    Math.round(data.main.temp);

  const feelsLike =
    Math.round(data.main.feels_like);

  const humidity =
    data.main.humidity;

  const wind =
    data.wind.speed;

  const pressure =
    data.main.pressure;

  const visibility =
    data.visibility
      ? (data.visibility / 1000).toFixed(1)
      : "N/A";

  const description =
    data.weather[0].description;

  const icon =
    data.weather[0].icon;

  document.getElementById("cityName").textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temperature").textContent =
    `${temperature}°C`;

  document.getElementById("feelsLike").textContent =
    `${feelsLike}°C`;

  document.getElementById("humidity").textContent =
    `${humidity}%`;

  document.getElementById("wind").textContent =
    `${wind} m/s`;

  document.getElementById("pressure").textContent =
    `${pressure} hPa`;

  document.getElementById("visibility").textContent =
    `${visibility} km`;

  document.getElementById("weatherDescription").textContent =
    description;

  document.getElementById("weatherIcon").textContent =
    getWeatherEmoji(icon);
}


/* =========================
   WEATHER ICON
========================= */

function getWeatherEmoji(icon) {

  const icons = {

    "01d": "☀️",
    "01n": "🌙",

    "02d": "🌤️",
    "02n": "☁️",

    "03d": "☁️",
    "03n": "☁️",

    "04d": "☁️",
    "04n": "☁️",

    "09d": "🌧️",
    "09n": "🌧️",

    "10d": "🌦️",
    "10n": "🌧️",

    "11d": "⛈️",
    "11n": "⛈️",

    "13d": "❄️",
    "13n": "❄️",

    "50d": "🌫️",
    "50n": "🌫️"
  };

  return icons[icon] || "🌤️";
}


/* =========================
   TRAVEL DASHBOARD
========================= */

function generateTravelDashboard(data) {

  const temperature =
    data.main.temp;

  const feelsLike =
    data.main.feels_like;

  const humidity =
    data.main.humidity;

  const wind =
    data.wind.speed;

  const description =
    data.weather[0].description.toLowerCase();

  let score = 100;

  let reasons = [];

  /* Temperature */

  if (feelsLike >= 40) {

    score -= 35;

    reasons.push(
      "extremely hot conditions"
    );

  } else if (feelsLike >= 35) {

    score -= 20;

    reasons.push(
      "hot and humid conditions"
    );

  } else if (feelsLike >= 32) {

    score -= 10;

    reasons.push(
      "warm conditions"
    );

  } else if (temperature < 10) {

    score -= 15;

    reasons.push(
      "cold conditions"
    );
  }


  /* Humidity */

  if (humidity >= 80) {

    score -= 15;

    reasons.push(
      "high humidity"
    );

  } else if (humidity >= 70) {

    score -= 8;

    reasons.push(
      "humid weather"
    );
  }


  /* Wind */

  if (wind >= 15) {

    score -= 20;

    reasons.push(
      "strong winds"
    );

  } else if (wind >= 10) {

    score -= 10;

    reasons.push(
      "moderate-to-strong winds"
    );
  }


  /* Rain */

  if (
    description.includes("rain") ||
    description.includes("drizzle") ||
    description.includes("thunderstorm")
  ) {

    score -= 20;

    reasons.push(
      "rainy weather"
    );
  }


  score = Math.max(
    0,
    Math.min(100, score)
  );


  document.getElementById("travelScore")
    .textContent = score;


  /* Travel status */

  let status;
  let summary;

  if (score >= 80) {

    status = "Excellent for Travel";

    summary =
      "🌟 Weather conditions are very favorable for travel and outdoor activities.";

  } else if (score >= 65) {

    status = "Good for Travel";

    summary =
      "👍 Weather conditions are generally good for travel with some precautions.";

  } else if (score >= 45) {

    status = "Travel with Caution";

    summary =
      "⚠️ Travel is possible, but weather conditions may make some outdoor activities uncomfortable.";

  } else {

    status = "Poor for Outdoor Travel";

    summary =
      "⚠️ Consider postponing outdoor activities or spending more time indoors.";
  }


  document.getElementById("travelStatus")
    .textContent = status;

  document.getElementById("travelSummary")
    .textContent = summary;


  /* Recommendation */

  generateRecommendation(
    feelsLike,
    humidity,
    wind,
    description
  );


  /* Best time */

  generateBestTime(
    feelsLike,
    humidity,
    description
  );


  /* Outdoor activity */

  generateActivity(
    feelsLike,
    humidity,
    wind,
    description
  );


  /* Packing */

  generatePacking(
    temperature,
    feelsLike,
    description
  );


  /* Alerts */

  generateAlerts(
    temperature,
    feelsLike,
    humidity,
    wind,
    description
  );
}


/* =========================
   TRAVEL RECOMMENDATION
========================= */

function generateRecommendation(
  feelsLike,
  humidity,
  wind,
  description
) {

  let recommendation;

  if (
    description.includes("thunderstorm")
  ) {

    recommendation =
      "⛈️ Thunderstorms are present. Avoid outdoor sightseeing and consider indoor attractions until conditions improve.";

  } else if (
    description.includes("rain")
  ) {

    recommendation =
      "🌧️ Rain is expected. Outdoor sightseeing may be affected, so carry an umbrella or rain jacket and consider indoor attractions.";

  } else if (
    feelsLike >= 38
  ) {

    recommendation =
      "🌤️ Travel is possible, but it may feel very hot outdoors. Plan sightseeing for the morning or evening, stay hydrated, and take frequent breaks in shaded or air-conditioned areas.";

  } else if (
    feelsLike >= 32
  ) {

    recommendation =
      "☀️ The weather is warm. Outdoor sightseeing is possible, but morning and evening are better times. Use sunscreen, stay hydrated, and take regular breaks.";

  } else if (
    feelsLike >= 20
  ) {

    recommendation =
      "🌤️ The weather looks comfortable for travel. Outdoor sightseeing and city exploration should be pleasant.";

  } else {

    recommendation =
      "🧥 The weather is relatively cool. Outdoor activities are possible, but bring an extra layer of clothing.";
  }

  document.getElementById(
    "recommendationText"
  ).textContent = recommendation;
}


/* =========================
   BEST TIME
========================= */

function generateBestTime(
  feelsLike,
  humidity,
  description
) {

  let morning;
  let evening;

  if (
    description.includes("rain") ||
    description.includes("thunderstorm")
  ) {

    morning =
      "Check the latest forecast before going outdoors.";

    evening =
      "Indoor activities are recommended if rain continues.";

  } else if (
    feelsLike >= 35
  ) {

    morning =
      "🌅 Best choice — cooler temperatures.";

    evening =
      "🌇 Best choice — avoid afternoon heat.";

  } else {

    morning =
      "🌅 Good for sightseeing.";

    evening =
      "🌇 Good for sightseeing.";
  }

  document.getElementById(
    "morningAdvice"
  ).textContent = morning;

  document.getElementById(
    "eveningAdvice"
  ).textContent = evening;
}


/* =========================
   OUTDOOR ACTIVITY
========================= */

function generateActivity(
  feelsLike,
  humidity,
  wind,
  description
) {

  const status =
    document.getElementById("activityStatus");

  const advice =
    document.getElementById("activityAdvice");


  if (
    description.includes("thunderstorm")
  ) {

    status.textContent =
      "⛔ Not Recommended";

    status.style.background =
      "#fee2e2";

    status.style.color =
      "#991b1b";

    advice.textContent =
      "Avoid outdoor activities during thunderstorms.";

  } else if (
    description.includes("rain")
  ) {

    status.textContent =
      "🌧️ Limited";

    status.style.background =
      "#fef3c7";

    status.style.color =
      "#92400e";

    advice.textContent =
      "Rain may make outdoor activities uncomfortable. Consider indoor attractions.";

  } else if (
    feelsLike >= 38
  ) {

    status.textContent =
      "⚠️ Not Ideal";

    status.style.background =
      "#ffedd5";

    status.style.color =
      "#9a3412";

    advice.textContent =
      "Avoid prolonged outdoor activity during the hottest part of the day.";

  } else {

    status.textContent =
      "👍 Suitable";

    status.style.background =
      "#dcfce7";

    status.style.color =
      "#166534";

    advice.textContent =
      "Outdoor sightseeing, walking, and city exploration should be suitable.";
  }
}


/* =========================
   PACKING
========================= */

function generatePacking(
  temperature,
  feelsLike,
  description
) {

  const list =
    document.getElementById("packingList");

  list.innerHTML = "";


  const items = [];


  if (feelsLike >= 30) {

    items.push(
      "👕 Light, breathable clothes"
    );

    items.push(
      "🕶️ Sunglasses"
    );

    items.push(
      "🧴 Sunscreen"
    );

    items.push(
      "💧 Water bottle"
    );

    items.push(
      "🧢 Hat or cap"
    );

  } else if (temperature < 15) {

    items.push(
      "🧥 Warm jacket"
    );

    items.push(
      "🧣 Warm layers"
    );

    items.push(
      "👟 Comfortable shoes"
    );

  } else {

    items.push(
      "👕 Comfortable clothes"
    );

    items.push(
      "👟 Walking shoes"
    );

    items.push(
      "🧴 Sunscreen"
    );
  }


  if (
    description.includes("rain") ||
    description.includes("drizzle") ||
    description.includes("thunderstorm")
  ) {

    items.push(
      "☔ Umbrella or rain jacket"
    );
  }


  items.forEach(item => {

    const li =
      document.createElement("li");

    li.textContent = item;

    list.appendChild(li);
  });
}


/* =========================
   WEATHER ALERTS
========================= */

function generateAlerts(
  temperature,
  feelsLike,
  humidity,
  wind,
  description
) {

  const alerts =
    document.getElementById("alertsList");

  alerts.innerHTML = "";


  const warnings = [];


  if (feelsLike >= 40) {

    warnings.push(
      "🔥 Extreme heat: avoid prolonged outdoor exposure and stay hydrated."
    );
  }


  if (humidity >= 85) {

    warnings.push(
      "💧 Very high humidity: outdoor activities may feel more uncomfortable."
    );
  }


  if (wind >= 15) {

    warnings.push(
      "💨 Strong winds: use caution during outdoor activities."
    );
  }


  if (
    description.includes("thunderstorm")
  ) {

    warnings.push(
      "⛈️ Thunderstorm warning: avoid outdoor activities."
    );
  }


  if (
    description.includes("rain")
  ) {

    warnings.push(
      "🌧️ Rain expected: carry an umbrella or rain jacket."
    );
  }


  if (warnings.length === 0) {

    alerts.innerHTML =
      '<div class="alert-item">✅ No major weather warnings.</div>';

    return;
  }


  warnings.forEach(warning => {

    const div =
      document.createElement("div");

    div.className =
      "alert-item";

    div.textContent =
      warning;

    alerts.appendChild(div);
  });
}


/* =========================
   UI HELPERS
========================= */

function showLoading(show) {

  document.getElementById("loading")
    .style.display =
    show ? "block" : "none";
}


function showError(message) {

  const error =
    document.getElementById("error");

  error.textContent =
    message;

  error.style.display =
    "block";
}


function hideError() {

  document.getElementById("error")
    .style.display =
    "none";
}


/* =========================
   ENTER KEY SEARCH
========================= */

document
  .getElementById("cityInput")
  .addEventListener(
    "keydown",
    function(event) {

      if (event.key === "Enter") {
        searchWeather();
      }

    }
  );


/* =========================
   LOAD CHENNAI AUTOMATICALLY
========================= */

window.addEventListener(
  "load",
  function() {
    searchWeather();
  }
);
