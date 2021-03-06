import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import DetailsScreen from '../screens/DetailsScreen';
import Categories from '../screens/Categories';
import AppIntro from '../screens/AppIntro'
import SplashScreen from 'react-native-splash-screen';
import SignInPage from '../screens/SignInPage';

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

const AuthStackNavigator = () => {
  SplashScreen.hide();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AppIntro" component={AppIntro} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
    </Stack.Navigator>
  )
}

export {HomeStackNavigator,AuthStackNavigator}
