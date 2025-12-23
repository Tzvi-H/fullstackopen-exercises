import axios from "axios";

const Countries = ({
  matchedCountryNames,
  countryInfo,
  setCountryInput,
  weatherInfo,
}) => {
  if (matchedCountryNames.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (matchedCountryNames.length > 1) {
    return (
      <p>
        {matchedCountryNames.map((country) => (
          <span key={country}>
            {country}
            <button onClick={() => setCountryInput(country)}>Show</button>
            <br />
          </span>
        ))}
      </p>
    );
  } else if (countryInfo && weatherInfo) {
    return (
      <div>
        <h1>{countryInfo.name.common}</h1>
        <p>Capital {countryInfo.capital[0]}</p>
        <p>Area {countryInfo.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(countryInfo.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countryInfo.flags.png} />
        <div>
          <h1>Weather in {countryInfo.name.common}</h1>
          <p>Temperature {weatherInfo.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          />
          <p>Wind {weatherInfo.wind.speed} m/s</p>
        </div>
      </div>
    );
  }
};

export default Countries;
