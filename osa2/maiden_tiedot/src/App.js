import React, { useState, useEffect } from 'react'
import axios from 'axios'

const countryData = 'https://restcountries.eu/rest/v2/all'
const weatherData = 'http://api.weatherstack.com/'
const API_KEY = process.env.REACT_APP_API_KEY

//----------------Filter--------------------------------------------------------

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

//--------------------Countries-------------------------------------------------

const Countries = ({ filtered, filterText, clickHandler, weather }) => {
  // console.log(filterText, "Countries");
  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filtered.length > 1) {
    return (
      <div>
        {filtered.map((country) =>
          <CountryMany
            key={country.name}
            country={country}
            clickHandler={() => clickHandler(country)}
          /> )
        }
      </div>
    )
  } else if (filtered.length === 1) {
    return(
      <div>
        <CountryOne key={filtered[0].name} country={filtered[0]} weather={weather}/>
      </div>
    )
  } else {
    return (
      <div>
        No matches, try another filter
      </div>
    )

  }
}

//-----------------List-of-countries--------------------------------------------

const CountryMany = (props) => {
  return (
    <div>
      {props.country.name}
      <button onClick={props.clickHandler}>show</button>
    </div>
  )
}

//------------Render-One-Country------------------------------------------------

const CountryOne = (props) => {
  const c = props.country
  const w = props.weather
  return (
    <>
      <h1>{c.name}</h1>
      <div>
        <p>capital {c.capital}</p>
        <p>population {c.population}</p>
      </div>
      <h2>languages</h2>
      <ul>
        {c.languages.map(l => <Language key={l.name} language={l.name} />)}
      </ul>
      <img
        src={c.flag}
        alt={`flag of ${c.name}`}
        width={200}
        border={1}
      />
      <h2>Weather in {c.capital}</h2>
      <div>
        temperature: {w.temperature} Celsius
      </div>
      <img
        src={w.weather_icons}
        alt={`weather in ${c.capital}`}
        width={50}
        border={1}
      />
      <div>
        wind: {w.wind_speed} kmph direction {w.wind_dir}
      </div>
    </>
  )
}

const Language = (props) => {
  return (
    <li>
      {props.language}
    </li>
  )
}

//--------------------App-------------------------------------------------------

const App = () =>  {
  const [ countries, setCountries] = useState([])
  const [ filterText, setFilterText] = useState('')
  const [ weather, setWeather] = useState([])
  // console.log(filterText, "Appissa");

  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(filterText.toLowerCase())
  )

  useEffect(() => {
    axios
      .get(countryData)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (filtered.length === 1) {
      const address =
        weatherData +
        "current?access_key=" +
        API_KEY +
        "&query=" +
        filtered[0].capital
      axios
        .get(address)
        .then(response => {
          setWeather(response.data.current)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleCountryClick = (country) => {
    setFilterText(country.name)
  }

  return (
    <div>
      <Filter filter={filterText} handleFilterChange={handleFilterChange}/>
      <Countries
        filtered={filtered}
        filterText={filterText}
        clickHandler={handleCountryClick}
        weather={weather}
      />
    </div>
  )
}

export default App;
