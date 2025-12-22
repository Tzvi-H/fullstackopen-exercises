import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
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
      });
  }, [matchedCountry]);
  const handleCountryInput = (e) => {
    setCountryInput(e.target.value);
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
      />
    </div>
  );
};

export default App;
