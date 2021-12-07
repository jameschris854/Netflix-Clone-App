import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import HeaderScroll from '../components/HeaderScroll';
import {Image, ScrollView} from 'native-base';
import Sync from '../Sync/Sync';
import {rand} from '../utils/utils';
import CommonRow from '../components/CommonRow';

const Home = () => {
  const [scroll, setScrollData] = useState(null);
  const [ms, setms] = useState(0);
  const [poster, setPoster] = useState(null);
  const [movieData, setMovieData] = useState(null);
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log('post',movieData);
  }, []);

  const init = async () => {
      console.log('init');
      try{
          let movies = await Sync.getMovies();
          setMovieData(movies.data.results)
          console.log(JSON.stringify(movies.data.results[0]));
          setPoster(
            `https://image.tmdb.org/t/p/w500${movies.data.results[rand(20)].poster_path}`,
          );
      }catch(e){
          console.error('init',e)
      }
  };

  const handleScroll = e => {
      return
    let time = ms + 1;
    setms(time);
    console.log(ms % 5, 'ms');
    if (ms % 10 === 0) setScrollData(e.nativeEvent);
  };

  console.log(movieData?.length);
  return (
    <>
      <HeaderScroll scrollData={scroll} />
      {poster && movieData && (
        <ScrollView
          style={{
            backgroundColor: '#000',
            height: '100%',
            width: '100%',
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          onScroll={data => handleScroll(data)}>
          <Image
            key={poster}
            source={{uri: poster}}
            height={500}
            width={'100%'}
            alt="cover pic"
          />
          <CommonRow data={movieData.splice(0, parseInt(movieData.length / 2))} title={'New This Week'} />
          <CommonRow data={movieData.splice(0 , movieData.length)} title={'New This Week'} />
          <Text onPress={() => init()} key={2} style={{color: '#ffff'}}>
            Home
          </Text>
        </ScrollView>
      )}
    </>
  );
};

export default Home;
