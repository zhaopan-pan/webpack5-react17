import React from 'react'
import { observer } from 'mobx-react'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { Link } from 'react-router-dom'
import styles from './style.css'

interface IProps {
    route?: RouteConfig
    store: {
        count: string
        add: () => void
        reduce: () => void
    }
}
const Layout: React.FC<any> = (props: IProps) => {
    const { route } = props
    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>
            <div className={styles.centerContent}>
                <div className={styles.rightSide}>
                    <div>
                        <Link to="/index/home">home1</Link>
                    </div>
                    <div>
                        <Link to="/index/user">user</Link>
                    </div>
                </div>
                <div className={styles.contentBox}>{renderRoutes(route!.routes)}</div>
            </div>
            <div className={styles.footer}>footer</div>
        </div>
    )
}
export default observer(Layout)
