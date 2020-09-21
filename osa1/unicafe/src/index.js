import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

const Statistics = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = (array) => {
    let sum_ = 0
    for (const val of array) {
      sum_ += val
    }
    return sum_
  }

  const average = (array) => {
    const sum_ = sum(array)
    let weight = 0;
    weight = array[0] - array[2]
    return weight/sum_
  }

  const positive = (array) => {
    const sum_ = sum(array)
    return ((array[0]/sum_ * 100) + " %")
  }

  const choices = [good, neutral, bad]
  if (!sum(choices)) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button name={"good"} handleClick={ () => setGood(good + 1)} />
        <Button name={"neutral"} handleClick={ () => setNeutral(neutral + 1)} />
        <Button name={"bad"} handleClick={ () => setBad(bad + 1)} />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button name={"good"} handleClick={ () => setGood(good + 1)} />
      <Button name={"neutral"} handleClick={ () => setNeutral(neutral + 1)} />
      <Button name={"bad"} handleClick={ () => setBad(bad + 1)} />
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistics text={"good"} value={good}/>
          <Statistics text={"neutral"} value={neutral}/>
          <Statistics text={"bad"} value={bad}/>
          <Statistics text={"all"} value={sum(choices)}/>
          <Statistics text={"average"} value={average(choices)}/>
          <Statistics text={"positive"} value={positive(choices)}/>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
