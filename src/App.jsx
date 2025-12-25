import Weather from "./components/Weather.jsx";
import React, {useState} from "react";
import WeatherMap from "./components/WeatherMap.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [query, setQuery] = useState("");
    const [weatherData, setWeatherData] = useState(false);
    const [latLong, setLatLong] = useState({});

    async function search(city) {
        if (city === "") return alert("Please enter a City Name.");
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                return alert("No City found!");
            }
            console.log(data);

            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const country = `https://flagcdn.com/w160/${data.sys.country.toLowerCase()}.png`;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                description: data.weather[0].description,
                country: country
            });
            setLatLong({
                lat: data.coord.lat,
                long: data.coord.lon
            })

        } catch (error) {
            setWeatherData(false);
            console.log(error);
        }
    }

    return (
        <div className="app container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <Weather query={query} setQuery={setQuery} search={search} weatherData={weatherData}
                             apiKey={import.meta.env.VITE_APP_ID}/>
                </div>

                <div className="col-md-6 mt-5 justify-content-center align-content-center">
                    {weatherData && latLong.lat && latLong.long && (
                        <WeatherMap
                            lat={latLong.lat}
                            lon={latLong.long}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default App
