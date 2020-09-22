import React from 'react'

const Course = ({course}) => {
  return (
    <>
      <Header key={course.name} course={course.name} />
      <Content key={course.id} parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}
const Header = (props) => {
  return (
      <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  const { parts } = props
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Part = (props) => {
  const { part } = props
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = (props) => {
  const { parts } = props
  const n = parts.reduce((p, c) => {
    return p + c.exercises
  }, 0)
  return (
      <h3>Total of {n} exercises</h3>
  )
}

export default Course
