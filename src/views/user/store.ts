import { observable, action, makeObservable } from 'mobx'

const store = {}
const skey = `/UserStore`

class UserStore {
    constructor() {
        makeObservable(this)
    }

    @observable
    count: number = 0

    @action
    addUser = () => {
        this.count = this.count + 1
    }

    @action
    reduceUser = () => {
        this.count = this.count - 1
    }
}
export default function () {
    if (store[skey]) {
        return store[skey]
    }
    return (store[skey] = new UserStore())
}
