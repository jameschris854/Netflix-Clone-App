import {observable, action, makeAutoObservable, makeObservable} from 'mobx';


class authStore {
    constructor(root){
        makeObservable(this);
        this.root = root
    }

    @observable 
    isUserVerified = false

    @action
    setUserVerification = (value) => {
        this.isUserVerified = value
        console.log(this.isUserVerified, 'setting verification state');
    }

}


export default authStore;