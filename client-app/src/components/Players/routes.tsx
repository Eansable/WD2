import Matches from "./OnePlayerTabs/Matches"
import Overview from "./OnePlayerTabs/Overview"
import Stats from "./OnePlayerTabs/Stats"

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