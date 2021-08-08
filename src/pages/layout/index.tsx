import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { Link } from 'react-router-dom'
import styles from './style.css'
import useClickOutside from '@/hooks/useClickOutside'

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
    const [active, setActive] = useState(false)
    const testRef = useRef(null)
    const { outside } = useClickOutside(testRef)
    useEffect(() => {
        if (outside) {
            setActive(!outside)
        }
    }, [outside])
    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>
            <div className={styles.centerContent}>
                <div className={styles.rightSide}>
                    <div>
                        <Link to="/index/home">home</Link>
                    </div>
                    <div>
                        <Link to="/index/user">user</Link>
                    </div>
                    <div
                        style={{ border: active ? '1px solid' : 'none' }}
                        onClick={() => setActive(true)}
                        ref={testRef}
                    >
                        确定
                    </div>
                </div>
                <div className={styles.contentBox}>{renderRoutes(route!.routes)}</div>
            </div>
            <div className={styles.footer}>footer</div>
        </div>
    )
}
export default observer(Layout)
