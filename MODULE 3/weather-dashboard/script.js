const apiKey = "1bc0a85da56e441b1f5c2ea3b2e7ab18";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    try {

        error.textContent = "";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").textContent =
            data.name + ", " + data.sys.country;

        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + " °C";

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity;

        document.getElementById("wind").textContent =
            data.wind.speed;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {

        document.getElementById("error").textContent =
            "City not found. Please enter a valid city name.";

        document.getElementById("cityName").textContent = "Weather Dashboard";
        document.getElementById("temperature").textContent = "-- °C";
        document.getElementById("description").textContent = "No data";
        document.getElementById("humidity").textContent = "--";
        document.getElementById("wind").textContent = "--";
        document.getElementById("weatherIcon").src = "";
    }
}
