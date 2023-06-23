import { Button, Form, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { useDispatch } from "react-redux"
import {addAction} from "./store/actions"
import { formInt } from "./types"
import { useAppDispatch } from "@/helpers/hooks"

const PositionNRI = () => {
    const dispatch = useAppDispatch()


   const handleClick = () => {
        
        dispatch(addAction({
            name: 'Вратарь',
            code: 'gk',
            positionType: 0
        }))
    }

    return (
        <div>
            
               
                    <Input></Input>
               
                    <Input></Input>
                

                <Button onClick={handleClick}>Сохранить</Button>

        </div>)
}

export default PositionNRI