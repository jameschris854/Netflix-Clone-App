import CommonStore from './commonStore'
import AuthStore from './authStore'
class RootStore {
    authStore
    commonStore

    constructor() {
      this.commonStore = new CommonStore(this)
      this.authStore = new AuthStore(this)
    }
  }

  export default new RootStore()