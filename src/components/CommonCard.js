import React from 'react';
import  {Box, Image} from 'native-base';
import {Pressable} from 'react-native';
import {inject,observer} from 'mobx-react'

const CommonCard = ({data,key=1,commonStore}) => {

  let poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`

  return (
      <Pressable onPress={() => commonStore.openDetailsSheet(key)}>
          <Box rounded="lg" width="130" height="175" padding="1">
            <Image
              backgroundColor={'rgb(72,72,72)'}
              borderRadius={5}
              resizeMethod="scale"
              resizeMode="cover"
              key={key}
              source={{uri: poster}}
              height={'100%'}
              width={'100%'}
              alt="cover pic"
            />
          </Box>
      </Pressable>
  );
};

export default inject('commonStore')(observer(CommonCard));
