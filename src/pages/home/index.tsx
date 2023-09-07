import React, { useEffect, useState } from 'react'
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
    const [first, setFirst] = useState(1)
    const commonStore = userStore('commonStore')
    console.log(commonStore)
    useEffect(() => {
        console.log('---1-----')
        setFirst(f => f + 1)
    }, [])

    return (
        <>
            {first}
            <span>welcome to home2</span>
            <button
                onClick={() => {
                    history.push('/user')
                }}
            >
                user
            </button>
            <input type="text" placeholder='123'/>
        </>
    )
}
export default observer(Home)
