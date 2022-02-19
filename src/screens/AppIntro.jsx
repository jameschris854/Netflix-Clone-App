import { Button } from 'native-base';
import React from 'react';
import {StatusBar, Text, View, StyleSheet, Dimensions} from 'react-native';
import Carousal from '../components/Carousal';
import HeaderStrip from '../components/HeaderStrip';
import colors from '../utils/colors';

const AppIntro = () => {
  const slideImages = [
    {
      id: 1,
      uri: 'https://www.watchtvabroad.com/wp-content/uploads/2018/06/netflix-mobile-app.jpg',
    },
    {
      id: 2,
      uri: 'https://www.watchtvabroad.com/wp-content/uploads/2018/06/netflix-mobile-app.jpg',
    },
    {
      id: 3,
      uri: 'https://www.watchtvabroad.com/wp-content/uploads/2018/06/netflix-mobile-app.jpg',
    },
    {
        id: 4,
        uri: 'https://www.watchtvabroad.com/wp-content/uploads/2018/06/netflix-mobile-app.jpg',
    },
  ];
  return (
    <View style={[styles.containerStyle]}>
      <HeaderStrip
        style={{
          marginTop: StatusBar.currentHeight,
          position: 'absolute',
          zIndex: 10,
        }}
        type={'AppIntro'}
      />
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          width: '100%',
        }}>
        <Carousal style={{width:Dimensions.get("screen").width,height:Dimensions.get("screen").height*0.86}} images={slideImages} />
      </View>
      <Button style={{backgroundColor:colors.primaryColor,width:'95%',height:47,borderRadius:3}}>
          <Text style={{color: '#ffffff',fontWeight:'800',fontSize:16,letterSpacing:2}}>GET STARTED</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default AppIntro;
