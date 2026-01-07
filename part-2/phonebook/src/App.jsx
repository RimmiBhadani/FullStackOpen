import { useState, useEffect } from 'react'
import Phonebook from './components/phonebook'
import PhonebookAdder from './components/phonebookadder'
import PhonebookFilter from './components/phonebookfilter'
import personService from './services/person'
import notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('')
  const [error, setError] = useState(null)
  const personsToShow = filterText
    ? persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
    : persons

  useEffect(() => {
    personService
      .getAll()
      .then(initialObject =>
        setPersons(initialObject)
      )
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <notification message={error} setMessage={setError} />
      <PhonebookFilter searchPerson={personsToShow} setFilterText={setFilterText} />
      <h2>Add a new</h2>
      <PhonebookAdder personsList={persons} setPerson={setPersons} />
      <h2>Numbers</h2>
      <Phonebook phoneBook={personsToShow} setPerson={setPersons} />
    </div>
  )
}

export default App