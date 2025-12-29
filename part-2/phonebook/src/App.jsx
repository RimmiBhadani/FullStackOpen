import { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/phonebook'
import PhonebookAdder from './components/phonebookadder'
import PhonebookFilter from './components/phonebookfilter'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('')
  const personsToShow = filterText
    ? persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
    : persons

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookFilter searchPerson={personsToShow} setFilterText={setFilterText} />
      <h2>Add a new</h2>
      <PhonebookAdder personsList={persons} setPerson={setPersons} />
      <h2>Numbers</h2>
      <Phonebook phoneBook={personsToShow} />
    </div>
  )
}

export default App