import EventsNRI from "./Events"
import PositionsNRI from "./Positions/"
import StadiumNRI from "./Stadiums"

export const routes = [
    {
        label: "Позиции",
        key: '1',
        children: <PositionsNRI />
    },
    {
        label: "Стадионы",
        key: '2',
        children: <StadiumNRI />
    },
    {
        label: "Действия",
        key: '3',
        children: <EventsNRI></EventsNRI>
    },
    {
        label: "Позиции",
        key: '4',
        children: <PositionsNRI></PositionsNRI>
    }
]

