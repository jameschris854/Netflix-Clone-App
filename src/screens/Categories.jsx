import {inject, observer} from 'mobx-react';
import {View, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import HeaderStrip from '../components/HeaderStrip';
import PosterCard from '../components/PosterCard';
import {rand} from '../utils/utils';
import {StatusBar, StyleSheet, TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonRow from '../components/CommonRow';

const Categories = ({commonStore, route, navigation}) => {
  const [poster, setPoster] = useState(null);
  const scrollOffset = useSharedValue(0);
  const categoryName = route.params.category.item.name;
  const [catRecommendation, setCatRecommendation] = useState({
    newList: [],
    popularList: [],
    trendingList: [],
    downloadList: [],
  });

  useEffect(() => {
    const posterInterval = async () => {
      try {
        setPoster(commonStore.newList[rand(18)]);
      } catch (e) {
        console.error(e);
      }
    };
    (async () => {
      await init();
      setInterval(posterInterval, 60000);
    })();

    return () => {
      clearInterval(posterInterval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      await init();
    })();
  }, [categoryName]);

  const init = async () => {
    try {
      await commonStore.getCategoryItems(categoryName);
      const catList = commonStore.categoryItems;
      setPoster(commonStore.categoryItems[rand(18)]);
      const recommendation = {
        newList: [],
        popularList: [],
        trendingList: [],
        downloadList: [],
      };
      const l = catList.length / 4;
      recommendation.newList = catList.splice(0, l);
      recommendation.popularList = catList.splice(0, l);
      recommendation.trendingList = catList.splice(0, l);
      recommendation.downloadList = catList;

      setCatRecommendation(recommendation);
    } catch (e) {
      console.error('init', e);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const headerMenus = [{name: categoryName, option: true}];

  const handleMenuClick = (data, store) => {
    console.log('hi1', data);
    if (data.option) {
      if (data.name === 'Movies') {
        store.setOptionList([
          {name: 'Home', click: 'home', isActive: false},
          {name: 'TV Shows', click: 'tv', isActive: false},
          {name: 'Movies', click: 'movies', isActive: true},
        ]);
      } else if (data.name === 'TV Shows') {
        store.setOptionList([
          {name: 'Home', click: 'home', isActive: false},
          {name: 'TV Shows', click: 'tv', isActive: true},
          {name: 'Movies', click: 'movies', isActive: false},
        ]);
      } else {
        store.setOptionList(commonStore.catagoryList);
      }
      store.showOption();
      console.log('hi');
    } else {
      if (data.name === 'Movies') {
        commonStore.setHomeMode('movies');
      } else if (data.name === 'TV Shows') {
        commonStore.setHomeMode('tv');
      }
    }
  };
  console.log(catRecommendation);
  return (
    <View style={{backgroundColor: '#000000'}}>
      <Animated.View style={[styles.headerContainer]}>
        <HeaderStrip type={'categories'} navigation={navigation} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderRadius: 0,
            alignSelf: 'flex-start',
            // backgroundColor: 'black',
          }}>
          {headerMenus.map(e => {
            return (
              <TouchableNativeFeedback
                useForeground={true}
                onPress={() => handleMenuClick(e, commonStore)}
                background={TouchableNativeFeedback.Ripple('#ffff', true, 50)}>
                <View style={{padding: 1}}>
                  <Text style={styles.subHeaderStyle}>
                    {e.name}
                    {e.option && (
                      <MaterialCommunityIcons
                        name="menu-down"
                        size={20}
                        style={{textAlignVertical: 'center'}}
                      />
                    )}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={{
          height: '100%',
          width: '100%',
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
        }}
        onScroll={scrollHandler}>
        {poster && catRecommendation.newList?.length > 0 && (
          <PosterCard poster={poster} />
        )}
        <CommonRow data={catRecommendation.newList} title={'New This Week'} />
        <CommonRow
          data={catRecommendation.popularList}
          title={'Popular on Netflix'}
        />
        <CommonRow
          data={catRecommendation.trendingList}
          title={'Trending Now'}
        />
        <CommonRow
          data={catRecommendation.downloadList}
          title={'Downloads For You'}
          type={'download'}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#0000003b',
    paddingRight: 10,
    paddingBottom: 3,
    zIndex: 100,
    marginTop: StatusBar.currentHeight,
  },
  subHeaderStyle: {
    fontSize: 17,
    color: '#ffff',
    marginHorizontal: 10,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
});

export default inject('commonStore')(observer(Categories));
