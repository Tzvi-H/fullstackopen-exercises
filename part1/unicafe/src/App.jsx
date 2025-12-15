import { useState } from 'react'

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={props.onGood}>good</button>
      <button onClick={props.onNeutral}>neutral</button>
      <button onClick={props.onBad}>bad</button>
    </div>  
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1 + bad * -1) / total) || 0
  const positive = (good / total) || 0
  console.log(good, neutral, bad, total, average)

  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        all {total}<br/>
        average {average}<br/>
        positive {positive} %
      </p>
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