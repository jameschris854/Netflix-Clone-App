import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Input} from 'native-base';
import Animated,{ Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const InputPrimary = ({width, labelText ,value ,onTextChange ,containerStyle,type,...props}) => {

  const [focusState,setFocusState] = useState(false)
  const [showPassword,togglePassword] = useState(false)
  const labelTop = useSharedValue(0)
  const labelFontSize = useSharedValue(17)

  const handleFocusChange = () => {
    setFocusState(true)
    labelTop.value = 15
    labelFontSize.value = 12
  }

  const handleBlur = () => {
    setFocusState(false)
    if(value) return
    labelTop.value = '45%'
    labelFontSize.value = 17
  }
  const animtedLabelTop = useAnimatedStyle(() => {
    return {
      top: withTiming(labelTop.value,{
        duration:100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      fontSize:withTiming(labelFontSize.value,{
        duration:100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    }
  })
  const isFocused = focusState
  return (
    <View style={[styles.container, {width: width,...containerStyle,backgroundColor : isFocused ? "#555" : '#313031'}]}>
      <Animated.Text style={[styles.labelStyle,animtedLabelTop, isFocused ? {left:0,color:'#ffffff'} : { }]}>
        {labelText}
      </Animated.Text>
      <Input showSoftInputOnFocus selectionColor={"#ffffff"} onFocus={handleFocusChange} onBlur={handleBlur} style={[styles.inputStyle, {}]} value={value} onChangeText={onTextChange} type={(type && !showPassword) ? type : 'text'} {...props} />
      { type === "password" && <Text style={styles.showPasswordStyle} onPress={() => togglePassword(!showPassword)}>{showPassword ? 'HIDE' : 'SHOW'}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    border: 'none',
    borderRadius: 5,
    position: 'relative',
    paddingVertical:15
  },
  labelStyle: {
    color: 'grey',
    position: 'absolute',
    marginLeft: 15,
    top:'60%',
    fontWeight: '800'
  },
  inputStyle: {
    borderWidth: 0,
    fontSize:20,
    marginLeft:7,
    color:"#ffffff",
    fontWeight:"700"
  },
  showPasswordStyle:{
    position:'absolute',
    right:10,
    top:'60%'
  }
});

export default InputPrimary;
