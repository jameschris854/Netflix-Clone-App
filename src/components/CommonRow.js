import React, {useEffect, useState} from 'react';
import {Box, Image, Text} from 'native-base';
import {FlatList, View, StyleSheet} from 'react-native';
const CommonRow = ({data, title}) => {
  console.log();
  const card = poster => {
    console.log(poster, 'asdasd');
    return (
      <Box rounded="lg" width="120" height="200" padding="1">
        <Image
          resizeMode="repeat"
          key={poster}
          source={{uri: poster}}
          height={500}
          width={'100%'}
          alt="cover pic"
        />
      </Box>
    );
  };

  return (
    <>
      <Text style={[styles.Header]}>{title}</Text>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={item =>{
            if(item.item.poster_path){
                return card(`https://image.tmdb.org/t/p/w500${item.item.poster_path}`)
            }else{
                return null
            }
        }
        }
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Header: {
    fontSize: 20,
    color: '#ffff',
    fontWeight: 'bold',
  },
});

export default CommonRow;
