import React from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import userStore from '@/hooks/useStore'

interface IProps {
    store: {
        count: string
        add: () => void
        reduce: () => void
    }
}

const Home: React.FC<any> = (props: IProps) => {
    const history = useHistory()
    const commonStore = userStore('commonStore')
    console.log(commonStore)
    return (
        <>
            <span>welcome to home</span>
            <button
                onClick={() => {
                    history.push('/user')
                }}
            >
                user
            </button>
        </>
    )
}
export default observer(Home)
