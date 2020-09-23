import React from 'react'

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

export default Persons
