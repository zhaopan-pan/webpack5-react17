import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Store, { UserStore } from './store'

interface IProps {
    store?: {
        count: string
        add: () => void
    }
}

@observer
class User extends Component<IProps> {
    store: UserStore = Store()
    #pageName: string = 'user'
    constructor(props: IProps) {
        super(props)
    }
    render() {
        return (
            <div>
                <div>{`${this.#pageName}`}</div>
                <div>{`人数：${this.store.count}`}</div>
                <button
                    onClick={() => {
                        this.store.addUser()
                    }}
                >
                    addUser
                </button>
                <button
                    onClick={() => {
                        this.store.reduceUser()
                    }}
                >
                    reduceUser
                </button>
            </div>
        )
    }
}
export default User
