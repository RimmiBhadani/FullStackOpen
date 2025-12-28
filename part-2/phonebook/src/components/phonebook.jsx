const Phonebook = ({ phoneBook }) => {
    return (
        <div>
            <ul>
                {phoneBook.map(person => <li key={person.name}>{person.name} - {person.number}</li>)}
            </ul>
        </div>
    );
}

export default Phonebook