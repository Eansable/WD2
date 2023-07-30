const success = (text:string, duration:number = 15) => {
    const notification = document.createElement("div")
    notification.innerText = text
    document.body.appendChild(notification)
    setTimeout(() => {
        document.body.removeChild(notification)
    }, duration)
}

const Notifications = {
    success,
}

export default Notifications