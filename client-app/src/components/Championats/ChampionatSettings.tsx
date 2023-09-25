import { changeDefaultAction } from "./store/actions"
import { ChampionatType } from "./types"
import { useAppDispatch } from "@/helpers/hooks"

interface PropsType {
    championat: ChampionatType
}

const ChampionatSettings = ({ championat }: PropsType) => {
    const dispatch = useAppDispatch()
    return <section>
        <h3>
            Настройки чемпионата
        </h3>
        <label>
            Стандартный чемпионат для отображения справа
            <input
                type="checkbox"
                checked={championat.isDefaultChamp}
                onChange={(e) => {
                    if (e.target.checked) {
                        dispatch(changeDefaultAction({ champId: championat.id }))
                    }
                }}
            />
        </label>
    </section>
}

export default ChampionatSettings