import { useState, useEffect } from 'react'
import Phonebook from './components/phonebook'
import PhonebookAdder from './components/phonebookadder'
import PhonebookFilter from './components/phonebookfilter'
import personService from './services/person'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
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

  const showNotification = (message, type = 'success') => {
    console.log(type);
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <PhonebookFilter searchPerson={personsToShow} setFilterText={setFilterText} />
      <h2>Add a new</h2>
      <PhonebookAdder personsList={persons} setPerson={setPersons} showNotification={showNotification}/>
      <h2>Numbers</h2>
      <Phonebook phoneBook={personsToShow} setPerson={setPersons} />
    </div>
  )
}

export default App