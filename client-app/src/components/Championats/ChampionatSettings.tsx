import { ChangeEvent } from "react"
import FileLoader from "../CustomElement/FileLoader"
import { changeDefaultAction, changeLogoAction } from "./store/actions"
import { ChampionatType } from "./types"
import { useAppDispatch } from "@/helpers/hooks"
import styles from "./styles.module.css"
import CustomButton from "../CustomElement/Button"

interface PropsType {
    championat: ChampionatType
}

const ChampionatSettings = ({ championat }: PropsType) => {
    const dispatch = useAppDispatch()

    const changeLogo = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fd = new FormData()
        if (championat?.id && event.target.files?.length) {
            fd.append('champId', String(championat.id))
            fd.append("newLogo", event.target.files[0])
            dispatch(changeLogoAction(fd))
        }
    }

    return <section className={styles.form_settings}>
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
        <label className={styles.form_logo}>
            <p>
                Загрузить новый логотип чемпионата
            </p>
            <FileLoader
                onChange={changeLogo}
            />
        </label>
    </section>
}

export default ChampionatSettings