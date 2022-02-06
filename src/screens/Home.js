import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {Image, Avatar, Actionsheet, Box} from 'native-base';
import Sync from '../Sync/Sync';
import {rand} from '../utils/utils';
import CommonRow from '../components/CommonRow';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';
import {LinearGradient, Rect, Defs, Svg, Stop} from 'react-native-svg';
import PosterOptions from '../components/PosterOptions';
import {inject, observer} from 'mobx-react';
import OptionMenu from '../components/OptionMenu';
import DetailsSheet from '../components/DetailsSheet';
import SplashScreen from 'react-native-splash-screen'

const Home = ({commonStore,navigation}) => {
  const [poster, setPoster] = useState(null);

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
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
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
    console.log(data, 'here');
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
        store.setOptionList([
          {name: 'cat', click: 'home', isActive: false},
          {name: 'cat', click: 'tv', isActive: true},
          {name: 'cat', click: 'movies', isActive: false},
        ]);
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
  let actionDetails = commonStore.actionSheetDetails
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'black'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#0000003b'}}>
          <Actionsheet
          isOpen={commonStore.actionSheetDetailsState}
          onClose={() => (commonStore.setActionSheetState(false))}
          hideDragIndicator={true}
          disableOverlay={false}>
          {actionDetails && <Actionsheet.Content backgroundColor={'#2B2B2B'}>
            <DetailsSheet actionDetails={actionDetails} store={commonStore} navigation={navigation}/>
          </Actionsheet.Content>}
        </Actionsheet>
        <Animated.View
          style={[
            styles.headerContainer,
            {top: 0, translateY: 0},
            scrollStyle,
          ]}>
          <View
            style={{
              width: '100%',
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => init()}>
            <Image
              size={60}
              style={{left: 0}}
              source={{
                uri: 'https://pngimg.com/uploads/netflix/netflix_PNG10.png',
              }}
              alt={'netflix'}
            />
            <Feather
              name="search"
              size={25}
              color={'#FFFF'}
              style={{marginLeft: 'auto', marginRight: 12}}
            />
            <Avatar
              style={[styles.avatar]}
              bg="lightBlue"
              size={7}
              // size={styles.avatar.size}
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
              }}>
              AK
            </Avatar>
          </View>
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
              console.log(e);
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
        {poster &&
        commonStore.newList?.length &&
        commonStore.popularList?.length ? (
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
            <View style={{width: '100%', height: screenHeight - 300}}>
              <Image
                key={poster.id}
                // source={{uri: `https://image.tmdb.org/t/p/w500/9xaAT3V3I9xxqnNiEjCivNFfdlh.jpg`}}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${poster.poster_path}`,
                }}
                backgroundColor={'red'}
                height={'100%'}
                width={'100%'}
                resizeMode="stretch"
                alt="cover pic"
              />
              <View
                style={{
                  position: 'absolute',
                  height: 180,
                  width: screenWidth + 10,
                  bottom: -1,
                  left: 0,
                }}>
                <Svg height="180" width={screenWidth + 10}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <Stop
                        offset="0"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0"
                      />
                      <Stop
                        offset="0.99"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0.9"
                      />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    width={screenWidth + 5}
                    height={180}
                    fill="url(#grad)"
                  />
                </Svg>
              </View>
            </View>
            <PosterOptions details={poster} />
            <CommonRow data={commonStore.newList} title={'New This Week'} />
            <CommonRow
              data={commonStore.popularList}
              title={'Popular on Netflix'}
            />
            <CommonRow data={commonStore.trendingList} title={'Trending Now'} />
            <CommonRow
              data={commonStore.downloadList}
              title={'Downloads For You'}
              type={'download'}
            />
            <View style={{width: '100%', height: 100}} />
            <Text onPress={() => init()} key={2} style={{color: '#ffff'}}>
              Home
            </Text>
          </Animated.ScrollView>
        ) : null}
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
    paddingVertical: 3,
    zIndex: 100,
  },
  avatar: {
    borderRadius: 5,
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
