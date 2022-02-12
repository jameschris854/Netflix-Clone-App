import React from 'react';
import  {Box, Image} from 'native-base';
import {Pressable} from 'react-native';
import {inject,observer} from 'mobx-react'

const CommonCard = ({data,id,poster,commonStore}) => {

  return (
      <Pressable onPress={() => commonStore.openDetailsSheet(id)}>
          <Box rounded="lg" width="130" height="175" padding="1">
            <Image
              backgroundColor={'rgb(72,72,72)'}
              borderRadius={5}
              resizeMethod="scale"
              resizeMode="cover"
              key={id}
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
