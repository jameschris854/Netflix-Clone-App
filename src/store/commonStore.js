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

  @observable
  generes = []

  @observable
  catagoryList = []

  @observable
  categoryItems = []

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
      await this.getGenre()
  }

  @action
  updateHomeMode = (data) => {
    this.homeMode = data
  }

  @action
  updateApiType = (data) => {
    this.apiType = data
  }
  @action 
  setHomeMode = async (data) =>  {
    if(data === 'home'){
      this.updateApiType('movie')
    }else if(data === 'tv'){
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

  @action
  setGeneres = async (data) => {
    this.generes = data?.data.genres
    this.generes.map(g => this.catagoryList.push({name:g.name,click:'cat',isActive:false}))
  }

  @action
  setCategoryItems = async (data) => {
    this.categoryItems = data.results
    console.log('cat   ',this.categoryItems);
  }

  getNewList = async () => {
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

  getSimilar = async (id) => {
    res = await Sync.getSimilar(id)
    return res?.data?.results
  }

  getReviews = async (id) => {
    res = await Sync.getReviews(id)
    return res?.data?.results
  }

  getGenre = async () => {
    res = await Sync.getGenre()
    console.log(JSON.stringify(res));
    this.setGeneres(res)
  }

  getCategoryItems = async (cat) => {
    res = await Sync.getCategoryItems(cat)
    this.setCategoryItems(res.data)
  }
}

export default new commonStore();