import React, {useState} from 'react';
import {View, Text} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const SegmentTab = ({tab1, tab2, speed, delay, tabWidth}) => {
  const [index, setIndex] = useState(0);
  const sharedVal = useSharedValue(0);
  const factor = Dimensions.get('window').width/50
  const toggleTab = i => {
    setIndex(i);
    i === 0
      ? (sharedVal.value = withDelay(
          delay,
          withTiming(0, {
            duration: speed,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        ))
      : (sharedVal.value = withDelay(
          delay,
          withTiming(50, {
            duration: speed,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        ));
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: `${sharedVal.value}%`,
    };
  });

  const animatedTab1Styles = useAnimatedStyle(() => {
    // let factor = Math.round(50/Dimensions.get('window').width*100)
    return {
      right: sharedVal.value*factor,
      display:sharedVal.value === 50 ? 'none' : 'flex'
    };
  });

  const animatedTab2Styles = useAnimatedStyle(() => {
    // let factor = Math.round(50/Dimensions.get('window').width*100)
    return {
      right: sharedVal.value !== 50 ? sharedVal.value*factor : 0,
      display:sharedVal.value === 50 ? 'flex' : 'none'
    };
  });

  return (
    <>
      <View
        style={{
          width: `${tabWidth}%`,
          marginTop: 25,
          flexDirection: 'row',
          position: 'relative',
        }}>
        <View
          style={{
            width: Dimensions.get('screen').width,
            borderTopColor: '#2F2F2F',
            borderTopWidth: 2,
            position: 'absolute',
            top: -2,
          }}
        />
        <TouchableOpacity
          onPress={() => toggleTab(0)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          }}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
            {tab1.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTab(1)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
          }}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
            {tab2.name}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              position: 'absolute',
              borderTopColor: 'red',
              borderTopWidth: 4,
              width: '48%',
              marginLeft: '1%',
            },
            animatedStyles,
          ]}
        />
      </View>
      <View style={{flexDirection: 'row', width: '101%'}}>
        <Animated.View style={[{width: '100%'}, animatedTab1Styles]}>
          <tab1.component />
        </Animated.View>
        <Animated.View style={[{width: '100%'}, animatedTab2Styles]}>
          <tab2.component />
        </Animated.View>
      </View>
    </>
  );
};

export default SegmentTab;
