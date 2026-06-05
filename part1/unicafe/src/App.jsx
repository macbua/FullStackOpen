import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return total ? (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={((good - bad) / total).toFixed(2)} />
          <StatisticLine text="positive" value={`${Math.floor(good / total * 100)}%`} />
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  /* Further, we do not use data validation checks, since we know that they are exactly equal to a number. */

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App