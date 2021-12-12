import {observable, action, makeAutoObservable, makeObservable} from 'mobx';
import Sync from '../Sync/Sync';

class commonStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable
  newList = [];

  @observable
  popularList = [];

  @action
  setNewList = (data) => {
      this.newList = data.data.results
  }
  @action
  setPopularList = (data) => {
      this.popularList = data.data.results
  }

  @action
  initHome = async () => {
      console.log('initstore');
      await this.getNewList()
      await this.getPopularList()
  }

  getNewList = async () => {
    console.log('setNewList');
    data = await Sync.getMoviesNew();
    this.setNewList(data);
  };

  getPopularList = async () => {
    data = await Sync.getMoviesPopular();
    this.setPopularList(data);
  }
}

export default new commonStore();