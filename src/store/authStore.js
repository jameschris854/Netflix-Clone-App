import {observable, action, makeAutoObservable, makeObservable} from 'mobx';


class authStore {
    constructor(root){
        makeObservable(this);
        this.root = root
    }

    @observable 
    isVerified = false

}


export default authStore;