import {View, Text, Image, Button} from 'native-base';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import React, {useEffect, useState} from 'react';
import {observer, inject} from 'mobx-react';

const DetailsScreen = ({commonStore, route}) => {
  const [actionDetails, setActionDetails] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew,setCrew] = useState(null)
  let castStr = '';
  let director = ''

  useEffect(() => {
    (async () => {
      console.log(JSON.stringify(route.params.actionDetails.id));
      let data = await route.params.actionDetails;
      setActionDetails(data);

      let cast = await commonStore.getCredits(data.id);
      setCast(cast.cast);
      setCrew(cast.crew);
      console.error(JSON.stringify(cast.cast));
    })();
  }, []);

  let runtime = actionDetails?.runtime;
  cast?.map(res => {
    castStr = castStr + res.name + ',';
  });

  crew?.map(res => {
    console.log(res);
    res.job === 'Director' ? director = res.name : null
  })

  console.log(castStr,director);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
      }}>
      {actionDetails && cast && (
        <>
          <View style={{height: 45, width: '100%'}} />
          <View style={{width: '100%', height: '28%'}}>
            <Image
              backgroundColor={'rgb(72,72,72)'}
              // borderRadius={5}
              resizeMethod="scale"
              resizeMode="cover"
              key={300}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${actionDetails.poster_path}`,
              }}
              alt="cover pic"
              width={'100%'}
              height={'100%'}
            />
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#ffffff',
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
              lineHeight: 28,
            }}>
            {actionDetails.original_title}
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={{color: '#8E8E8E'}}>
              {
                actionDetails?.[
                  'movie' !== 'tv' ? 'release_date' : 'first_air_date'
                ]?.split('-')[0]
              }
              {'   '}
            </Text>
            <Text
              style={{
                color: '#8E8E8E',
                backgroundColor: '#363636',
                borderRadius: 4,
                paddingHorizontal: 8,
                justifyContent: 'center',
                alignSelf: 'center',
                transform: [{scaleY: 0.8}],
              }}>
              {actionDetails.adult ? '18+' : '13+'}
            </Text>
            <Text style={{color: '#8E8E8E', marginLeft: 5}}>
              {'movie' !== 'tv'
                ? `${Math.floor(runtime / 60)}h ${Math.floor(
                    (runtime / 60 - Math.floor(runtime / 60)) * 100,
                  )}m`
                : `${actionDetails.number_of_seasons} Season`}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: 'white',
              width: '97%',
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginTop: 10,
              height: 35,
            }}>
            <>
              <Entypo name="controller-play" size={25} color="#000" />
              <Text style={{fontWeight: '900'}}>Play</Text>
            </>
          </TouchableOpacity>
          <Button
            width={'97%'}
            background={'#262626'}
            borderRadius={4}
            marginTop={3}
            alignSelf={'flex-start'}
            leftIcon={
              <MaterialCommunityIcons
                name="download"
                size={25}
                color="#ffffff"
              />
            }
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold'}}>
              Download
            </Text>
          </Button>
          <Text
            noOfLines={3}
            alignSelf={'flex-start'}
            color={'#ffffff'}
            marginTop={2}>
            {actionDetails.overview}
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: 8}}
            alignSelf={'flex-start'}>
            <Text noOfLines={1} color={'#AAAAAA'} width={'80%'}>
              <Text>{`Starring: ${castStr}`}</Text>
            </Text>
            <Text color={'#ffffff'}>more</Text>
          </View>
          <Text alignSelf={'flex-start'} color={'#AAAAAA'}>Director: {director}</Text>

          {/* 
      <View>
        
        
        
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: '50%',
            borderRadius: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
          }}>
          <Entypo name="controller-play" size={25} color="#000" />
          <Text style={{fontWeight: '900'}}>Play</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name="download" size={25} color="#ffff" />
          <Text style={{color: '#848484', fontSize: 12, fontWeight: 'bold'}}>
            Download
          </Text>
          <Text>{actionDetails.overview}</Text>
        </View>
      </View> */}
        </>
      )}
    </View>
  );
};

export default inject('commonStore')(observer(DetailsScreen));
