import {observable, action, makeAutoObservable, makeObservable} from 'mobx';
import Sync from '../Sync/Sync';

class commonStore {
  constructor() {
    makeObservable(this);
  }
  // global
  @observable
  homeMode = "home"

  @observable
  optionState = false

  @observable
  optionList = []

  @observable
  apiType = 'movie'

  // api variables
  @observable
  newList = [];

  @observable
  popularList = [];

  @observable
  trendingList = [];

  @observable
  downloadList = []

  @observable
  actionSheetDetails = null

  @observable
  actionSheetDetailsState = false

  @action
  setNewList = (data) => {
      this.newList = data.data.results
  }
  @action
  setPopularList = (data) => {
      this.popularList = data.data.results
  }

  @action
  setOptionList = (data) => {
    this.optionList = data
  }

  @action
  showOption = () => {
      this.optionState = true
  }

  @action
  hideOption = () => {
    this.optionState = false
  }

  @action
  setTrendingList = (data) => {
    function shuffleArray(d) {
        for (var c = d.length - 1; c > 0; c--) {
          var b = Math.floor(Math.random() * (c + 1));
          var a = d[c];
          d[c] = d[b];
          d[b] = a;
        }
        return d
      };
      let d = shuffleArray(data.data.results)
      console.log(d);
      this.trendingList = d
  }

  @action
  setDownloadList = (data) => {
    this.downloadList = data.data.results
  }

  @action
  initHome = async () => {
      console.log('initstore',this.apiType);
      await this.getNewList()
      await this.getPopularList()
      await this.getTrendingList()
      await this.getDownloadList()
  }

  @action
  updateHomeMode = (data) => {
    this.homeMode = data
  }

  @action
  updateApiType = (data) => {
    console.log('up api',data);
    this.apiType = data
  }
  @action 
  setHomeMode = async (data) =>  {
    console.log('-----change to ------',data);
    if(data === 'home'){
      this.updateApiType('movie')
    }else if(data === 'tv'){
      console.log('hi');
      this.updateApiType('tv')
    }else{
      this.updateApiType('movie')
    }
    this.updateHomeMode(data)
    await this.initHome()
  }

  @action
  setActionSheetState = (data) => {
    this.actionSheetDetailsState = data
  }

  @action
  setActionSheetDetails = async (data) => {
    this.actionSheetDetails = data.data
    this.setActionSheetState(true)
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

  getTrendingList = async () => {
    data = await Sync.trendingList();
    this.setTrendingList(data);
  }

  getDownloadList = async () => {
    data = await Sync.getMoviesPopular(10);
    this.setDownloadList(data);
  }

  openDetailsSheet = async (id) => {
    data = await Sync.getDetails(id);
    this.setActionSheetDetails(data)
  }

  getCredits = async (id) => {
    data = await Sync.getCredits(id)
    return data?.data
  }
}

export default new commonStore();