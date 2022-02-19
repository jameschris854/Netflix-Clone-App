import React, {useState, useEffect} from 'react';
import {Image, ScrollView} from 'native-base';
import {StyleSheet, View, Text} from 'react-native';

const Carousal = ({images, style}) => {
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < images.length; i++) {
      data.push({isActive: i === 0 ? true : false, index: i});
    }
    setPagination(data);
  }, []);

  const handleOnScroll = e => {
    let data = pagination;
    const page = Math.round(e.nativeEvent.contentOffset.x / style.width);
    data.forEach(data =>
      page === data.index ? (data.isActive = true) : (data.isActive = false),
    );
    setPagination([...data]);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      <ScrollView
        onScroll={handleOnScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {images.map(image => {
          return (
            <Image
              key={image.id}
              resizeMode="stretch"
              style={[styles.imageStyle, {width: style.width}]}
              alt="Intro"
              source={{uri: image.uri}}
            />
          );
        })}
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        {pagination?.map(page => {
          return (
            <Text
              key={page.index}
              style={[
                page.isActive ? styles.activeDot : styles.inActiveDot,
                {marginHorizontal: 6, marginVertical: 10, fontSize: 13},
              ]}>
              ●
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  activeDot: {
    color: '#747474',
  },
  inActiveDot: {
    color: '#2E2E2E',
  },
});

export default Carousal;
