import { observable, action, makeObservable } from 'mobx'

class Store {
    constructor() {
        // makeObservable(this)
    }

    @observable
    count: number = 0

    @action
    add = () => {
        this.count = this.count + 1
    }

    @action
    reduce = () => {
        this.count = this.count - 1
    }
}
export default makeObservable(new Store())
