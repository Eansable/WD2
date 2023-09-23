import Matches from "./Matches"
import Overview from "./Overview"
import Stats from "./Stats"

const routes = [
    {
        name: "Общие",
        element: <Overview />
    },
    {
        name: "Статистика",
        element: <Stats />
    },
    {
        name: "Матчи",
        element: <Matches />
    },
]

export default routes