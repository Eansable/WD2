import routes from './routes'
import CustomButton from '@/components/CustomElement/Button'
import { MatchType } from '../../types'
import styles from './styles.module.css'
import { useState } from 'react'

interface PropsType {
    match: MatchType
}

const MatchTabs = ({ match }: PropsType) => {
    const [active, setActive] = useState(routes[0].id)
    const Element = routes.find((el) => el.id == active)?.component
    return <section className={styles.match_tabs}>
        <header>
            {routes.map((item) => {
                return <button
                    className={`${styles.match_tabs_button} ${active === item.id ? styles.match_tabs_button_active : ""}`}
                    onClick={() => setActive(item.id)}
                >
                    {item.title}
                </button>
            })}

            
        </header>
        <div>
        </div>
    </section>
}

export default MatchTabs
