import { Checkbox } from "antd"
import { useState } from "react";

interface PropsType {
    roles?: string[]
}

const ManageRoles = ({ roles = [] }: PropsType) => {
    const [isReferee, setIsReferee] = useState(roles?.includes("referee"));
    const [isContentManager, setIsContentManager] = useState(roles?.includes("contentManager"));

    return <div>
        <p> Роли пользователя: </p>
        <div>
            <label>
                Судья:
                <Checkbox
                    checked={isReferee}
                    onChange={() => setIsReferee(!isReferee)}
                />
            </label>
            <label>
                Контент менеджер:
                <Checkbox
                    checked={isContentManager}
                    onChange={() => setIsReferee(!isContentManager)}
                />
            </label>
            <label>
                Капитан команды:
                <Checkbox
                />
            </label>
            <Checkbox />
            <Checkbox />
        </div>
    </div>
}

export default ManageRoles