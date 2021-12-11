import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text,Button} from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Image} from 'native-base';
import {useSharedValue,useAnimatedStyle} from 'react-native-reanimated'
const HeaderScroll = ({scrollData}) => {
//   useEffect(() => {console.log(top);}, [top]);
//   console.log(pos,'anim');
const offset = useSharedValue(0);
console.log('header update',scrollData,offset);

const animatedStyles = useAnimatedStyle(() => {
  return {
    transform: [{ translateX: offset.value * 255 }],
  };
});

  return (
  <>
      <Animated.View style={[{height:50,width:50,backgroundColor:'blue'}, animatedStyles]} />
      <Button
        onPress={() => (offset.value = Math.random())}
        title="Randomize"
      />
    </>
  )

  // return (
  //   <Animated.View style={[styles.headerContainer, {top:0,translateY:scrollData}]}>
  //     <View
  //       style={{
  //         width: '100%',
  //         height: 40,
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <Image
  //         size={60}
  //         style={{left: 0}}
  //         source={{uri: 'https://pngimg.com/uploads/netflix/netflix_PNG10.png'}}
  //         alt={'netflix'}
  //       />
  //       <Feather
  //         name="search"
  //         size={25}
  //         color={'#FFFF'}
  //         style={{marginLeft: 'auto', marginRight: 12}}
  //       />
  //       <Avatar
  //         style={styles.avatar}
  //         bg="lightBlue"
  //         size={styles.avatar.size}
  //         source={{
  //           uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
  //         }}>
  //         AK
  //       </Avatar>
  //     </View>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: 40,
  //       }}>
  //       <Text style={styles.subHeaderStyle}>TV Shows</Text>
  //       <Text style={styles.subHeaderStyle}>Movies</Text>
  //       <Text style={styles.subHeaderStyle}>
  //         Categories{' '}
  //         <MaterialCommunityIcons
  //           name="menu-down"
  //           size={20}
  //           style={{textAlignVertical: 'center'}}
  //         />
  //       </Text>
  //     </View>
  //   </Animated.View>
  // );
};

export default HeaderScroll;

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#0000003b',
    paddingRight: 10,
    paddingVertical: 3,
    zIndex: 100,
  },
  avatar: {
    borderRadius: 5,
  },
  subHeaderStyle: {
    color: '#ffff',
    marginHorizontal: 10,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
});
