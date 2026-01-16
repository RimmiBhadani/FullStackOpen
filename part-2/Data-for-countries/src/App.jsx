import { useState, useEffect } from 'react'
import countryService from './service/Countries'
import weatherService from './service/Weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
        setFilteredCountries(initialCountries)
      })
  }, [])


  const filterCountries = (countryName) => {
    // Exact match (like "Sudan" vs "South Sudan") will show the country details directly
    const exactMatch = allCountries.find(country =>
      country.name.common.toLowerCase() === countryName.toLowerCase()
    )
    if (!exactMatch) {
      const countriesToShow = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
      setFilteredCountries(countriesToShow)
      if (countriesToShow.length !== 1) {
        return
      }
    }
    else {
      setFilteredCountries([exactMatch])
    }

    // There is only one country to show, fetch its weather data
    const country = exactMatch || filteredCountries[0]
    weatherService.getWeatherData(country.latlng[0], country.latlng[1])
      .then(weatherData => {
        console.log(weatherData);
        setWeatherData(weatherData)
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    filterCountries(event.target.value)
  }

  return (
    <form>
      <div>find countries <input value={filter} onChange={handleFilterChange} />
        {filteredCountries.length === 1 && (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <div>Capital: {filteredCountries[0].capital}</div>
            <div>Area: {filteredCountries[0].area}</div>
            <h3>Languages:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} />
            <h2>Weather in {filteredCountries[0].capital}</h2>
            <div>Temperature: {weatherData ? weatherData.main.temp : 'Loading...'} °C</div>
            <div>Wind: {weatherData ? weatherData.wind.speed : 'Loading...'} m/s</div>
            {weatherData && weatherData.weather[0] && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather icon"
              />
            )}
          </div>
        )}
        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>{country.name.common}
                <button onClick={() => filterCountries(country.name.common)}>show</button>
              </li>
            ))}
          </ul>
        )}
        {filteredCountries.length > 10 && (
          <div>Too many matches, specify another filter</div>
        )}
      </div>
    </form>

  )
}

export default App