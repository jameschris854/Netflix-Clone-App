import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import DetailsScreen from '../screens/DetailsScreen';
import Categories from '../screens/Categories';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen}  options={{animation:'slide_from_right'}}/>
      <Stack.Screen name="Categories" component={Categories} option={{animation:'slide_from_right'}} />
    </Stack.Navigator>
  );
};

export {HomeStackNavigator}
