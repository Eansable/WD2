import { Tabs } from "antd"
import { routes } from "../components/NRI/routes"

const NRI = () => {
    return <div>
        <Tabs
            tabPosition="left"
            items={routes}
        >
        </Tabs>
    </div>
}

export default NRI