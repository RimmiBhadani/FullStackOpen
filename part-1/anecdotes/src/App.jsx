import { useState } from 'react'

const Display = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stats = ({anecdotes, votes}) => {
  const maxVotes = Math.max(...votes)
  const maxVotedIndex = votes.indexOf(maxVotes)

  if (maxVotes == 0) return <p>No votes given</p>

  return(
    <div>
      <p>{anecdotes[maxVotedIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

  

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random()* anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)

  }
  
  return (
    <div>
      <Display text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick = {handleClick} text ='next anecdote' />
      <Button onClick = {handleVoteClick} text ='vote' />
      <Display text='Anecdote with most votes' />
      <Stats anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
