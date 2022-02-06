import React, {useState} from 'react';
import {View, Text} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const SegmentTab = ({tab1, tab2, speed, delay, tabWidth}) => {
  const [index, setIndex] = useState(0);
  const sharedVal = useSharedValue(0);

  const toggleTab = i => {
    console.log(i);
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

  const animatedTabStyles = useAnimatedStyle(() => {
    return {
      marginRight: `-${sharedVal.value*2}%`,
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
      <View style={{flexDirection:'row',backgroundColor:'green',width:'101%'}}>
        <Animated.View style={[{width:'100%'},animatedTabStyles]}>
          <tab1.component />
        </Animated.View>
        <Animated.View style={[{width:'100%'}]}>
          <tab2.component />
        </Animated.View>
      </View>
    </>
  );
};

export default SegmentTab;
