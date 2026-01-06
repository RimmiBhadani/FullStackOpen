import axios from 'axios';

const Phonebook = ({ phoneBook, setPerson }) => {

    const deletePerson = (personId, person) => {
        console.log(person);
        if (window.confirm("Are you sure you want to delete this person?")) {

            axios.delete(`http://localhost:3001/persons/${personId}`)
                .then(response => {
                    console.log(response.data);
                    setPerson(phoneBook.filter(p => p.id !== personId));
                })
        }
    };

    return (
        <div>
            <ul>
                {
                    phoneBook.map(person =>
                        <li key={person.name}>{person.name} - {person.number}
                            <button onClick={() => deletePerson(person.id, person)}>delete</button>
                        </li>)
                }
            </ul>
        </div>
    );
}

export default Phonebook