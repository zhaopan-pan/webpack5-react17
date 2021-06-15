import * as React from 'react'
import Routers from '../route'
import { Provider } from 'mobx-react'
import Store from '../store'

export default function RootContainer() {
    return (
        <Provider store={Store}>
            <Routers />
        </Provider>
    )
}
