import { Link, useLocation } from 'react-router-dom';
import { ColoredLine } from '../../../components/ColoredLine'
import styles from '../edit-profile.module.scss'
import { Paths } from '../../../config/routes';


interface IProfileNav {
    text: string,
    pathname: string
}
export const PROFILE_NAV: IProfileNav[] = [
    {
        text: 'General',
        pathname: Paths.EDIT_PROFILE + '/general'
    },
    {
        text: 'Contacts',
        pathname: Paths.EDIT_PROFILE + '/contacts'
    }
]

export function ProfileNav() {
    const location = useLocation();

    return (
        <div>

            <ul className={styles.profileNav}>
                {PROFILE_NAV.map((item, i) => {
                    const isActive = location.pathname == item.pathname ? styles.active : ''

                    return (
                        <li
                            key={i}
                            className={isActive}
                        ><Link to={item.pathname}>{item.text}</Link></li>
                    )
                })}
            </ul>

            <ColoredLine />

        </div>
    )
}