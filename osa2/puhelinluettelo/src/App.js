import React, { useState } from 'react'

const Filter = (props) => {
  return (
    <div> filter shown with: <input value={props.filter} onChange={props.handler} /> </div>
  )
}

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addName}>
        <div> name: <input value={props.newName} onChange={props.handleNameChange} /> </div>
        <div> number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div> <button type="submit">add</button> </div>
      </form>
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.filterText.toLowerCase())
      ).map((person) =>
          <Person person={person} key={person.name} />
      )}
    </>
  )
}

const Person = ({ person }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find( person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterText(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filterText} handler={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filterText={filterText} />
    </div>
  )

}

export default App
