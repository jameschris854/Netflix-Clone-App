import {
  Button,
  CheckIcon,
  Box,
  InfoIcon,
  Circle,
  CircleIcon,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const PosterOptions = ({details}) => {
  const [categories, setCategories] = useState(null);

  const genres = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];

  useEffect(() => {
    console.log(details);
    let data = details.genre_ids;
    let cat = [];
    data.map(e => {
      let res = genres.filter(gen => e === gen.id);
      cat.push(res[0].name);
    });
    setCategories(cat);
    console.log(categories, 'cat');
  }, []);

  const Generes = () => {
    return (
      <>
        {categories.map((res, i) => (
          <View
            style={[{display: 'flex', flexDirection: 'row'}, styles.center]}>
            <Text style={{color: '#ffff', marginHorizontal: 5}}>{res}</Text>
            {(i !== res.length - 1)? (
              <CircleIcon size="1.5" color={'rgb(255,191,0)'} />
            ):null}
          </View>
        ))}
      </>
    );
  };

  return (
    <>
      {categories && (
        <View
          style={{
            display: 'flex',
            width: '100%',
            height: 60,
            top: -40,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}>
            <Generes />
          </View>
          <View
            style={[
              {display: 'flex', flexDirection: 'row',marginTop:15},
              {justifyContent: 'space-evenly', alignItems: 'center'},
            ]}>
            <View
              style={[
                {display: 'flex', flexDirection: 'column'},
                styles.center,
              ]}>
              <Box
                _text={{
                  textAlign: 'center',
                }}>
                <CheckIcon size="6" color={'#FFFF'} />
              </Box>
              <Text style={{color: '#ffff', fontSize: 10}} textAlign="center">
                My List
              </Text>
            </View>
            <Button
              alignSelf={'center'}
              borderRadius={3}
              height={8}
              width={20}
              size={'sm'}
              padding={0}
              paddingTop={0}
              startIcon={
                <Entypo name="controller-play" size={25} color="#000" />
              }
              color={'#000'}
              bgColor={'#ffff'}>
              <Text style={{fontSize: 15, fontWeight: '500', color: '#000'}}>
                Play
              </Text>
            </Button>
            <View
              style={[
                {display: 'flex', flexDirection: 'column'},
                styles.center,
              ]}>
              <Box
                _text={{
                  textAlign: 'center',
                }}>
                <InfoIcon size="6" color={'#FFFF'} />
              </Box>
              <Text textAlign="center" style={{color: '#ffff', fontSize: 10}}>
                My List
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PosterOptions;
