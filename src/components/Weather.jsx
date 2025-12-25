import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import './Weather.css';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import SearchResultsList from "./SearchResultsList.jsx";


export default function Weather({query, setQuery, search, weatherData}) {
    const [results, setResults] = useState([]);


    const fetchData = (value) => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=b28e97b39fdbf9b6ed1ade27e0423259`)
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                const results = json.filter(city => value && city && city.name.toLowerCase().includes(value.toLowerCase()));
                console.log(results);
                setResults(results);
            })
            .catch(err => console.log(err));
    }

    function handleQueryChange(e) {
        setQuery(e.target.value);
        fetchData(e.target.value);
        if (e.target.value === "") setResults([]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        search(query);
        setQuery("");
        setResults([]);
    }


    return (
        <div>
            <h2 className="heading">Weather APP</h2>
            <div className="weather">
                <form className="search-bar"
                      onSubmit={e => handleSubmit(e)}
                >
                    <input
                        onChange={e => handleQueryChange(e)}
                        value={query}
                        type="search"
                        placeholder="Search..."
                    />
                    <SearchResultsList results={results} handleSumbit={handleSubmit}/>

                    <button type="submit" aria-label="Search">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </form>

                <div className={`weather-content ${weatherData ? "show" : ""}`}>
                    {weatherData ? <>
                        <h1 className="mt-3">{weatherData.description.toUpperCase()}</h1>
                        <img src={weatherData.icon} alt="" className="weather-icon"/>
                        <p className="temperature">{weatherData.temperature}°C</p>
                        <p className="location">{weatherData.location} <img
                            src={weatherData.country}
                            alt={weatherData.country}
                            className="flag"
                        /></p>

                        <div className="weather-data">
                            <div className="colu">
                                <img src={humidity_icon} alt=""/>
                                <div>
                                    <p className="wdata">{weatherData.humidity} %</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="colu">
                                <img src={wind_icon} alt=""/>
                                <div>
                                    <p className="wdata">{weatherData.windSpeed} Km/h</p>
                                    <span>Wind Speed</span>
                                </div>
                            </div>
                        </div>

                    </> : <><h1 className="enter">Enter a City Name</h1></>}
                </div>

            </div>

        </div>
    )
}