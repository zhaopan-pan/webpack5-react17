import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

interface IProps {
    store: {
        count: string
        add: () => void
        reduce: () => void
    }
}
const App = (props: IProps) => {
    const history = useHistory()
    const [haha, setHaha] = useState('12')
    console.log(props)
    return (
        <div>
            <div onClick={() => setHaha('212122')}>click</div>
            <span>{haha}</span>
            <div>{props.store.count}</div>
            <button
                onClick={() => {
                    history.push('/about')
                }}
            >
                about
            </button>
            <button
                onClick={() => {
                    history.push('/user')
                }}
            >
                user
            </button>
            <button
                onClick={() => {
                    props.store.add()
                }}
            >
                add count
            </button>
            <button
                onClick={() => {
                    props.store.reduce()
                }}
            >
                reduce count
            </button>
        </div>
    )
}
export default inject('store')(observer(App))
