import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet} from 'react-native';
import Games from './src/screens/Games.js';
import News from './src/screens/News.js';
import Laughs from './src/screens/Laughs.js';
import Downloads from './src/screens/Dowloads.js';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'mobx-react';
import commonStore from './src/store/commonStore.js';
import OptionMenu from './src/components/OptionMenu.js';
import { View } from 'native-base';
const App = () => {
  const Tab = createBottomTabNavigator();

  const tabOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#ffff',
    tabBarInactiveTintColor: '#747474',
    tabBarStyle: {...styles.tabBarStyle},
  };

  const tabData = [
    {
      name: 'Home',
      component: Home,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons name="home-variant" size={30} color={color} />
      ),
      unFocusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="home-variant-outline"
          size={30}
          color={color}
        />
      ),
    },
    {
      name: 'Games',
      component: Games,
      focusedIcon: ({color}) => (
        <Ionicons name="game-controller" size={30} color={color} />
      ),
      unFocusedIcon: ({color}) => (
        <Ionicons name="game-controller-outline" size={30} color={color} />
      ),
    },
    {
      name: 'News',
      component: News,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="play-box-multiple"
          size={30}
          color={color}
        />
      ),
      unFocusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="play-box-multiple-outline"
          size={30}
          color={color}
        />
      ),
    },
    {
      name: 'Laughs',
      component: Laughs,
      focusedIcon: ({color}) => (
        <FontAwesome5 name="smile" size={30} color={color} />
      ),
      unFocusedIcon: ({color}) => (
        <FontAwesome name="smile-o" size={30} color={color} />
      ),
    },
    {
      name: 'Downloads',
      component: Downloads,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="arrow-down-circle"
          size={30}
          color={color}
        />
      ),
      unFocusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="arrow-down-circle-outline"
          size={30}
          color={color}
        />
      ),
    },
  ];

  return (
    <Provider commonStore={commonStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <OptionMenu />
            <StatusBar
              backgroundColor="#000"
              barStyle={'default'}
              animated={true}
              hidden={false}
              translucent={false}
            />
            <Tab.Navigator screenOptions={tabOptions} initialRouteName="Home">
              {tabData.map(tab => (
                <>
                  <Tab.Screen
                    options={{
                      tabBarLabelStyle: {bottom: 5},
                      tabBarLabel: tab.name,
                      tabBarIcon: ({focused, color}) =>
                        focused ? (
                          <tab.focusedIcon color={color} />
                        ) : (
                          <tab.unFocusedIcon color={color} />
                        ),
                    }}
                    name={tab.name}
                    size={30}
                    component={tab.component}
                  />
                </>
                  ))}
            </Tab.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 65,
    paddingVertical: 10,
    borderTopColor: '#121212',
    backgroundColor: '#121212',
  },
});

export default App;
