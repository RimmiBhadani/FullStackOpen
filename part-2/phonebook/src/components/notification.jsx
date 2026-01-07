const notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        
        <div className={`message_${notification.type}`}>
            {notification.message}
        </div>
    )
}

export default notification