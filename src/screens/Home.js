import React, { useState } from 'react';
import {View, Text, Dimensions} from 'react-native';
import HeaderScroll from '../components/HeaderScroll';
import {Image,ScrollView} from 'native-base'

const Home = () => {
    const [scroll,setScrollData] = useState(null)
    const [ms,setms] = useState(0)
    const handleScroll = (e) => {
        let time = ms + 1
        setms(time)
        console.log(ms%5,'ms');
        if(ms%10 === 0 ) setScrollData(e.nativeEvent)
        
    }
    return (
    <>
    <HeaderScroll scrollData={scroll} />
    <ScrollView
      style={{
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
      }}
      contentContainerStyle={{
        justifyContent: 'flex-start',
          }}
          onScroll={(data) => handleScroll(data) }
      >
      <Image key={1} source={{uri:'https://m.media-amazon.com/images/I/A12-NFRep6L._AC_SY741_.jpg'}} height={500} width={'100%'} alt='cover pic' />
      <Text key={2} style={{color: '#ffff'}}> Home </Text>
    </ScrollView>
    </>
  );
};

export default Home;
