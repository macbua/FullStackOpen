const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  const Content = ({ parts }) => {
    return (
      <div>
        <Part {...parts[0]} />
        <Part {...parts[1]} />
        <Part {...parts[2]} />
      </div>
    )
  }
  const Total = ({ parts }) => {
    return (
      <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    )
  }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header {...course} />
      <Content {...course} />
      <Total {...course} />
    </div>
  )
}

export default App