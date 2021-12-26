import React from 'react';
import {Box, Column, Image, Text, View} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable, Touchable, TouchableOpacity} from 'react-native';

const DetailsSheet = ({actionDetails,store}) => {
  let runtime = actionDetails.runtime;
  return (
    <Box w="100%" justifyContent="space-between" height={220}  >
      <View style={{flexDirection: 'row', width: '100%'}}>
        <Image
          backgroundColor={'rgb(72,72,72)'}
          borderRadius={5}
          resizeMethod="scale"
          resizeMode="cover"
          key={300}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${actionDetails.poster_path}`,
          }}
          height={120}
          width={'20%'}
          alt="cover pic"
        />
        <View style={{flexDirection: 'column',marginLeft:'3%'}}>
          <View style={{flexDirection: 'row',justifyContent:'space-between',width:"82%"}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white',fontWeight:'bold',fontSize:17}}>{actionDetails.title?.toUpperCase()}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#848484'}}>
                  {actionDetails?.release_date?.split('-')[0]}{"   "}
                </Text>
                <Text style={{color: '#848484'}}>
                  {actionDetails.adult ? '18+' : '13+'}{"  "}
                </Text>
                <Text style={{color: '#848484'}}>{`${Math.floor(
                  runtime / 60,
                )}h ${Math.floor(
                  (runtime / 60 - Math.floor(runtime / 60)) * 100,
                )}m`}</Text>
              </View>
            </View>
            <Pressable onPress={() => store.setActionSheetState(false)}>
              <MaterialCommunityIcons
                name="close"
                size={23}
                color="#ffff"
                style={{
                  backgroundColor: '#848484',
                  height: 23,
                  borderRadius: 50,
                }}
              />
            </Pressable>
          </View>
          <View style={{width: '80%'}}>
            <Text tail numberOfLines={3} style={{color: '#ffff'}}>
              {actionDetails.overview}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '95%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: '50%',
            borderRadius: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
          }}>
          <Entypo name="controller-play" size={25} color="#000" />
          <Text style={{fontWeight: 'bold'}}>Play</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name="download" size={25} color="#ffff" />
          <Text style={{color: '#848484', fontSize: 12, fontWeight: 'bold'}}>
            Download
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name="play-outline" size={25} color="#ffff" />
          <Text style={{color: '#848484', fontSize: 12, fontWeight: 'bold'}}>
            Preview
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          flexDirection: 'row',
          borderTopColor: '#373737',
          borderTopWidth: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical:10
        }}>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color="#ffff"
        />
        <Text style={{color: 'white', marginLeft: 10}}>Details & More</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={25}
          color="#ffff"
          style={{marginLeft: 'auto'}}
        />
      </Pressable>
    </Box>
  );
};

export default DetailsSheet;
