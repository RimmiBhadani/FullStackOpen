import { useState } from 'react'
import axios from 'axios';
import personService from '../services/person'

const PhonebookAdder = ({ personsList, setPerson }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = personsList.find(person => person.name === newName)
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update({ ...existingPerson, number: newNumber })
                    .then(returnedObject => {
                        const mapped = personsList.map(person => person.id !== existingPerson.id ? person : returnedObject)
                        setPerson(mapped)
                        setNewName('')
                        setNewNumber('')
                    });
            }
            return
        }
        const personObject = {
            name: newName,
            number: newNumber
        }

        personService
            .create(personObject)
            .then(returnedObject => {
                setPerson(personsList.concat(returnedObject))
                setNewName('')
                setNewNumber('')
            })

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PhonebookAdder