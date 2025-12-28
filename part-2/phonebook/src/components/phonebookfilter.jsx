const PhonebookFilter = ({ searchPerson, setFilterText }) => {
    const handleFilterChange = (event) => {
        setFilterText(event.target.value)
    }
    return (
        <div>
            filter shown with <input values={searchPerson} onChange={handleFilterChange} />
        </div>
    );
}

export default PhonebookFilter