import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import {Image, Avatar, Actionsheet, Box} from 'native-base';
import {rand} from '../utils/utils';
import CommonRow from '../components/CommonRow';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native';
import {inject, observer} from 'mobx-react';
import HeaderStrip from '../components/HeaderStrip';
import DetailsSheet from '../components/DetailsSheet';
import SplashScreen from 'react-native-splash-screen';
import PosterCard from '../components/PosterCard';
import HomeLoader from '../Loaders/HomeLoader';

const Home = ({commonStore, navigation}) => {
  const [poster, setPoster] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const scrollOffset = useSharedValue(0);
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
      SplashScreen.hide();
      setLoading(false);
    })();
    return () => {
      clearInterval(posterInterval);
    };
  }, []);

  const init = async () => {
    console.log('init----------');
    try {
      await commonStore.initHome();
      setPoster(commonStore.newList[rand(18)]);
    } catch (e) {
      console.error('init', e);
    }
  };

  const scrollStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollOffset.value > 50 ? -50 : -scrollOffset.value,
        },
      ],
      backgroundColor: `${
        scrollOffset.value > 50
          ? 'rgba(0,0,0,0.5)'
          : `rgba(0,0,0,${parseInt(scrollOffset.value) / 100})`
      }`,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const headerMenus = [{name: 'Categories', option: true}];
  if (commonStore.homeMode === 'home') {
    headerMenus.unshift({name: 'Movies', option: false});
    headerMenus.unshift({name: 'TV Shows', option: false});
  } else if (commonStore.homeMode === 'tv') {
    headerMenus.unshift({name: 'TV Shows', option: true});
  } else {
    headerMenus.unshift({name: 'Movies', option: true});
  }

  const handleMenuClick = (data, store) => {
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
    } else {
      if (data.name === 'Movies') {
        commonStore.setHomeMode('movies');
      } else if (data.name === 'TV Shows') {
        commonStore.setHomeMode('tv');
      }
    }
  };
  let actionDetails = commonStore.actionSheetDetails;
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'black'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#0000003b'}}>
        <Actionsheet
          isOpen={commonStore.actionSheetDetailsState}
          onClose={() => commonStore.setActionSheetState(false)}
          hideDragIndicator={true}
          disableOverlay={false}>
          {actionDetails && (
            <Actionsheet.Content backgroundColor={'#2B2B2B'}>
              <DetailsSheet
                actionDetails={actionDetails}
                store={commonStore}
                navigation={navigation}
              />
            </Actionsheet.Content>
          )}
        </Actionsheet>
        <Animated.View
          style={[
            styles.headerContainer,
            {top: 0, translateY: 0},
            scrollStyle,
          ]}>
          <HeaderStrip type={'home'} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 0,
              // backgroundColor: 'black',
            }}>
            {headerMenus.map(e => {
              return (
                <TouchableNativeFeedback
                  useForeground={true}
                  onPress={() => handleMenuClick(e, commonStore)}
                  background={TouchableNativeFeedback.Ripple(
                    '#ffff',
                    true,
                    50,
                  )}>
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
        {/* {poster &&
            commonStore.newList?.length &&
          commonStore.popularList?.length ? ( */}
        <Animated.ScrollView
          style={{
            backgroundColor: '#000',
            height: '100%',
            width: '100%',
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          onScroll={scrollHandler}>
          {isLoading ? (
            <HomeLoader />
          ) : (
            <>
              <PosterCard poster={poster} />
              <CommonRow data={commonStore.newList} title={'New This Week'} />
              <CommonRow
                data={commonStore.popularList}
                title={'Popular on Netflix'}
              />
              <CommonRow
                data={commonStore.trendingList}
                title={'Trending Now'}
              />
              <CommonRow
                data={commonStore.downloadList}
                title={'Downloads For You'}
                type={'download'}
              />
              <View style={{width: '100%', height: 100}} />
              <Text onPress={() => init()} key={2} style={{color: '#ffff'}}>
                Home
              </Text>
            </>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    </>
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

export default inject('commonStore')(observer(Home));
