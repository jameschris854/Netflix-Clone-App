import React, {useEffect, useState} from 'react';
import {Actionsheet, ArrowBackIcon, Box, Image, Text} from 'native-base';
import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import {LinearGradient, Rect, Defs, Svg, Stop} from 'react-native-svg';
import {inject,observer} from 'mobx-react'
import CommonCard from '../components/CommonCard'

const CommonRow = ({data, title, type,commonStore}) => {
  useEffect(() => {
    let isDownload = false

    data.map((e)=> {
      console.log(e.type);
      e.type === 'download' ? isDownload = true : null
    })

    if (type === 'download' && !isDownload) {
      data.unshift({
        poster:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Zrnbx9d9XDnRB2QgN2tAFQXIVQzMWevU85OE5xpq98rFu30RA4L_H5-5yDOTDN3_9wk&usqp=CAU',
        type: 'download',
      });
    }
  }, []);

  const card = ({poster, type ,key}) => {
    const width = 260
    console.log(key);
    return (
      <>
      <Pressable onPress={() => commonStore.openDetailsSheet(key)}>
        {type === 'download' ? (
          <Box rounded="lg" width={width} height="175" padding="1" marginRight="1">
            <Svg style={{position:'absolute',top:0,zIndex:1}} height="175" width={width}>
                  <Defs>
                    <LinearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                      <Stop
                        offset="0"
                        stopColor="rgb(0,0,0,0.9)"
                        stopOpacity="0"
                      />
                      <Stop
                        offset="0.99"
                        stopColor="#696969"
                        stopOpacity="0.9"
                      />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    width={width}
                    height={175}
                    fill="url(#grad)"
                  />
                </Svg>
                <View style={{position:'absolute',height:175,width:width,top:0,display:'flex',zIndex:2}}>
                  <ArrowBackIcon style={{marginLeft:'auto',marginRight:10,transform:([{rotateY:'180deg'}]),width:20}}  color='#ffff'/>
                  <Text style={{color:'#ffff',fontWeight:'bold',fontSize:20,marginTop:'20%',marginLeft:10}}>Watch on the go</Text>
                  <Text style={{color:'#7e7e7e',marginLeft:10}}>Tap to setup <Text style={{color:'#ffff'}}>Downloads for you</Text> and enjoy recommended  movies and shows offline</Text>
                </View>
            <Image
              backgroundColor={'rgb(72,72,72)'}
              borderRadius={5}
              resizeMethod="scale"
              resizeMode="cover"
              key={300}
              source={{uri: poster}}
              height={'100%'}
              width={'100%'}
              alt="cover pic"
            />
          </Box>
        ) : (
          <CommonCard data={{poster_path:poster}} poster={poster} id={key} key={key} />
        )}
      </Pressable>
      </>
    );
  };

  return (
    <>
      <Text style={[styles.Header]}>{title}</Text>
    <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(item,i) => {
          if(item.item.type === 'download'){
            return card({
              poster: item.item.poster,
              type: item.item.type,
              key:item.item.id
            });
          } else if(item.item.poster_path ) {
            return card({
              poster: `https://image.tmdb.org/t/p/w500${item.item.poster_path}`,
              type: 'common',
              key: item.item.id
            });
          }else{
            return
          }
        }}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Header: {
    fontSize: 21,
    color: '#ffff',
    fontWeight: '600',
    marginTop: 25,
    marginLeft:5
  },
});

export default inject('commonStore')(observer(CommonRow));
