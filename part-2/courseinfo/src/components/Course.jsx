const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => <h2>{course.name}</h2>

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => {
  const total = 
  parts.reduce((sum, part) => sum+part.exercises, 0)
  return <h3>total {total} exercises </h3>
} 

export default Course