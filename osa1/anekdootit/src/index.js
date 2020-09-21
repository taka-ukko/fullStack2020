import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )
}

const rand = (n) => {
  return (
    Math.floor(Math.random() * Math.floor(n))
  )
}

const App = ({ anecdotes }) => {
  const n = anecdotes.length
  const [selected, setSelected] = useState(rand(n))
  const [votes, setVotes] = useState(new Array(n).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleRandClick = () => {
    let newRand = selected
    while (newRand === selected) {
      newRand = rand(n)
    }
    setSelected(newRand)
  }

  const handleVoteClick = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
    if (temp[selected] > temp[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {votes[selected]} votes</p>
      <br></br>
      <Button handler={handleVoteClick} text={"vote"}/>
      <Button handler={handleRandClick} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
      <br></br>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
