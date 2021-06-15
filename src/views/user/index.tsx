import React, { Component } from 'react'
// import test from '@/views/test'
import { observer } from 'mobx-react'
import Store from './store'
interface IProps {
    store: {
        count: string
        add: () => void
    }
}

@observer
class Index extends Component<IProps> {
    store = new Store()
    #aa = 2
    constructor(props: IProps) {
        super(props)
        console.log('user-store', this.store)
    }
    render() {
        return (
            <div>
                {this.store.count}
                <div>{`私有属性${this.#aa}`}</div>
            </div>
        )
    }
}
export default Index
