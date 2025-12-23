import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountryNames(response.data.map((country) => country.name.common));
      });
  }, []);

  const matchedCountryNames = countryNames.filter(
    (country) =>
      countryInput.length > 0 &&
      country.toLowerCase().startsWith(countryInput.toLowerCase())
  );

  const matchedCountry =
    matchedCountryNames.length === 1 ? matchedCountryNames[0] : null;

  useEffect(() => {
    if (!matchedCountry) {
      setCountryInfo(null);
      return;
    }
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${matchedCountry}`
      )
      .then((response) => {
        setCountryInfo(response.data);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${
              response.data.capital[0]
            }&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
          )
          .then((response) => setWeatherInfo(response.data));
      });
  }, [matchedCountry]);

  const handleCountryInput = (e) => {
    setCountryInput(e.target.value);
    setCountryInfo(null);
    setWeatherInfo(null);
  };

  if (countryNames.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <div>
      find countries{" "}
      <input value={countryInput} onChange={handleCountryInput} />
      <Countries
        countryInfo={countryInfo}
        matchedCountryNames={matchedCountryNames}
        setCountryInput={setCountryInput}
        weatherInfo={weatherInfo}
      />
    </div>
  );
};

export default App;
