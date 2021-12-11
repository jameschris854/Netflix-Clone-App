import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import {Image, Avatar} from 'native-base';
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

const Home = () => {
  const [poster, setPoster] = useState(null);
  const [movieData, setMovieData] = useState([]);
  const scrollOffset = useSharedValue(0);
  useEffect(() => {
    
    const posterInterval = async () => {
      try {
        setPoster(posterCollection[rand(20)]);
      } catch (e) {
        console.error(e);
      }
    };
    (async () => {
      await init();
      setInterval(posterInterval, 4000);
    })();
    return () => {
      clearInterval(posterInterval);
    };
  }, []);

  const init = async () => {
    console.log('init----------');
    try {
      movies = await Sync.getMovies();
      posterCollection = movies.data.results;
      setMovieData(movies.data.results);
    } catch (e) {
      console.error('init', e);
    }
  };

  const scrollStyle = useAnimatedStyle(() => {
    // console.log(scrollOffset.value);
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
  console.log(screenWidth);
  console.log(poster);
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'black'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#0000003b'}}>
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
            }}>
            <Text style={styles.subHeaderStyle}>TV Shows</Text>
            <Text style={styles.subHeaderStyle}>Movies</Text>
            <Text style={styles.subHeaderStyle}>
              Categories{' '}
              <MaterialCommunityIcons
                name="menu-down"
                size={20}
                style={{textAlignVertical: 'center'}}
              />
            </Text>
          </View>
        </Animated.View>
        {/* <HeaderScroll scrollData={animatedStyles} /> */}
        {/* <Animated.View style={[{height:50,width:50,backgroundColor:'blue'},animatedStyles]} /> */}
        {/* <Button onPress={() => (offset.value = Math.random())} title="Move" /> */}

        {poster && movieData.length && (
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
            <View style={{width: '100%', height: 450}}>
              <Image
                key={poster.id}
                // source={{uri: `https://image.tmdb.org/t/p/w500/9xaAT3V3I9xxqnNiEjCivNFfdlh.jpg`}}
                source={{uri: `https://image.tmdb.org/t/p/w500/${poster.poster_path}`}}
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
                  bottom: 0,
                  left:0
                }}>
                <Svg height="180" width={screenWidth+10}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <Stop
                        offset="0"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0"
                      />
                      <Stop offset="0.99" stopColor="rgb(0,0,0,0.9)" stopOpacity="0.9" />
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
            <CommonRow
              data={movieData.slice(0, movieData.length / 2)}
              title={'New This Week'}
            />
            <CommonRow
              data={movieData.slice(movieData.length / 2, movieData.length)}
              title={'New This Week'}
            />
            <Text onPress={() => init()} key={2} style={{color: '#ffff'}}>
              Home
            </Text>
          </Animated.ScrollView>
        )}
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

export default Home;
