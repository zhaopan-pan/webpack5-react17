import { makeAutoObservable, observable } from 'mobx'

class CommonStore {
    @observable
    title = ''
    @observable
    theme = 'default122'

    constructor() {
        // 响应式就靠他
        this
    }

    setTheme(theme: string) {
        this.theme = theme
    }

    setTitle(title: string) {
        this.title = title
    }
}

export default makeAutoObservable(new CommonStore())
