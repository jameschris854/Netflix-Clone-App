import {FlatList, Skeleton, View} from 'native-base';
import React from 'react';
import colors from '../utils/colors';

const HomeLoader = () => {
  const DATA = Array.from({length: 15}, (v, i) => i);
  console.log(DATA);
  const skeletonColor = colors.skeletonLoaderColor;

  const Row = () => {
    return (
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={data => (
          <Skeleton
            key={data}
            startColor={'#181818'}
            style={{height: 160, width: 115, marginRight: 6, marginLeft: 5}}
          />
        )}
      />
    );
  };

  return (
    <View style={{backgroundColor: '#000', height: '100%'}}>
      <View
        h="60%"
        width={'100%'}
        color={skeletonColor}
        justifyContent={'flex-end'}
        marginBottom={'20'}
        alignItems={'center'}>
        <Skeleton
          height={'25%'}
          width={'65%'}
          rounded={'md'}
          startColor={skeletonColor}
        />
        <Skeleton
          height={'3%'}
          width={'80%'}
          marginTop={5}
          borderRadius={50}
          startColor={skeletonColor}
        />
        <Skeleton
          height={'7%'}
          width={'20%'}
          rounded={'md'}
          marginTop={5}
          startColor={skeletonColor}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Skeleton
          height={6}
          width={180}
          rounded={'md'}
          marginBottom={5}
          marginLeft={1}
          startColor={skeletonColor}
        />
        <Row />
      </View>
      <View style={{marginTop: 10}}>
        <Skeleton
          height={6}
          width={180}
          rounded={'md'}
          marginBottom={5}
          marginLeft={1}
          startColor={skeletonColor}
        />

        <Row />
      </View>
      <View style={{marginTop: 10}}>
        <Skeleton
          height={6}
          width={180}
          rounded={'md'}
          marginBottom={5}
          marginLeft={1}
          startColor={skeletonColor}
        />

        <Row />
      </View>
    </View>
  );
};

export default HomeLoader;
