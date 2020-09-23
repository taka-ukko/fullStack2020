import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

const Countries = ({ countries, filterText }) => {
  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(filterText.toLowerCase())
)
  if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filtered.length > 1) {
    return (
      <div>
        {filtered.map((country) => <CountryMany key={country.name} country={country}/>)}
      </div>
    )
  } else if (filtered.length === 1) {
    return(
      <div>
        <CountryOne key={filtered[0].name} country={filtered[0]} />
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

const CountryMany = (props) => {
  return (
      <p>{props.country.name}</p>
  )
}

const CountryOne = (props) => {
  const c = props.country
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

const App = () =>  {
  const [ countries, setCountries] = useState([])
  const [ filterText, setFilterText] = useState('Finland')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <Filter filter={filterText} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} filterText={filterText}/>
    </div>
  )
}

export default App;
