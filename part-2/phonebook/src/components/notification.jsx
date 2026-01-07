const notification = ({ message, setMessage }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default notification