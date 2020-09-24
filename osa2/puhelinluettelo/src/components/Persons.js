import React from 'react'

const Persons = (props) => {
  return (
    <>
      {props.persons.filter((person) =>
        person.name.toLowerCase().includes(props.filterText.toLowerCase())
      ).map((person) =>
          <Person
            person={person}
            key={person.id}
            remove={() => props.remove(person.id)}
          />
      )}
    </>
  )
}

const Person = ({ person, remove }) => {
  return (
    <div>
      {person.name} {person.number} {' '}
      <button onClick={remove} >delete</button>
    </div>
  )
}

export default Persons
