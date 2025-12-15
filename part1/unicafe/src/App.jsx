import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={props.onGood} text="good"/>
      <Button onClick={props.onNeutral} text="neutral"/>
      <Button onClick={props.onBad} text="bad"/>
    </div>  
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1 + bad * -1) / total) || 0
  const positive = (good / total) * 100 || 0

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={`${positive} %`}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <Feedback onGood={handleGood} onNeutral={handleNeutral} onBad={handleBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App