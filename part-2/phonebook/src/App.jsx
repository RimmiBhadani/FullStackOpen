import { useState } from 'react'
import Phonebook from './components/phonebook'
import PhonebookAdder from './components/phonebookadder'
import PhonebookFilter from './components/phonebookfilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filterText, setFilterText] = useState('')
  const personsToShow = filterText
    ? persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))
    : persons

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