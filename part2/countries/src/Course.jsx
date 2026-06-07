const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part=><Part {...part} key={part.id}/>)
        }
      </div>
    )
  }

  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <b>total of {total} exercises</b>
    )
  }

  const Course = ({ courses }) =>{
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => 
                    <div key={course.id}>
                        <Header name={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )}
        </div>
    )
  }

export default Course