import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    PersonService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const messageSetter = (type, text) => {
    setMessage( {
      message: text,
      type: type
    })
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const addOrUpdate = (event) => {
    event.preventDefault()
    const already = persons.find( person => person.name === newName)
    if (already) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (!confirmed) {
        return
      } else {
        updateNumber(already.id, newNumber)
      }
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const newObject = {
      name: newName,
      number:newNumber
    }
    PersonService
    .create(newObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
      messageSetter("success", `Added ${returnedPerson.name}`)
    })

  }

  const removeName = id => {
    const person = persons.find(n => n.id === id)
    const confirmed = window.confirm(`Delete ${person.name}`)
    if (confirmed) {
      PersonService
      .remove(id)
      .then(response => {
        const removed = persons.find(person => person.id === id)
        setPersons(persons.filter(person => person.id !== id))
        messageSetter('success', `Removed ${removed.name}`)
      })
    }
  }

  const updateNumber = (id, number) => {
    const person = persons.find(n => n.id === id)
    // console.log(person);
    const changedPerson = {...person, number: number}
    // console.log(changedPerson);
    PersonService
    .update(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => {
        return person.id !== id ? person : returnedPerson
      }))
      setNewName("")
      setNewNumber("")
      messageSetter('success', `Updated the number of ${returnedPerson.name}`)
    })
    .catch(error => {
      messageSetter('error', `Information of ${person.name} has already been removed from the server`)
      setPersons(persons.filter(n => n.id !== id))
    })
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilterText(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filterText} handler={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
        addName={addOrUpdate}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterText={filterText}
        remove={removeName}
      />
    </div>
  )

}

export default App
