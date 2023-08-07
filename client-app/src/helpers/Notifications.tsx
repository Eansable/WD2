import { notification } from "antd"

const success = (text:string, duration:number = 15) => {
   notification.success({
    message: text,
    placement: "top",
    duration
   })
}

const warning = (text:string, duration:number = 15) => {
   notification.warning({
    message: text,
    placement: "top",
    duration
   })
}

const error = (text:string, duration:number = 15) => {
   notification.error({
    message: text,
    placement: "top",
    duration
   })
}

const Notifications = {
    success,
    warning,
    error
}


export default Notifications