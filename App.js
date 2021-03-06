import React, {useEffect} from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//components

import {StyleSheet} from 'react-native';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// global components
import OptionMenu from './src/components/OptionMenu.js';
//store
import {Provider} from 'mobx-react';
import commonStore from './src/store/commonStore.js';
//footer
import tabData from './src/utils/footer';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import rootStore from './src/store/rootStore.js';
import authStore from './src/store/authStore.js';
import { AuthStackNavigator } from './src/Navigators/StackNavigator.js';

const App = () => {
  const Tab = createBottomTabNavigator();

  const tabOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#ffff',
    tabBarInactiveTintColor: '#747474',
    tabBarStyle: {...styles.tabBarStyle},
  };

  useEffect(() => {
    (async () => {
      try {
        changeNavigationBarColor('#000000');
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Provider commonStore={rootStore.commonStore} authStore={rootStore.authStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <OptionMenu />
            <StatusBar
              backgroundColor="rgba(0,0,0,0)"
              barStyle={'default'}
              animated={true}
              hidden={false}
              translucent={true}
              networkActivityIndicatorVisible={false}
              showHideTransition
            />
            {authStore.isVerified ? (
              <Tab.Navigator screenOptions={tabOptions} initialRouteName="Home">
                {changeNavigationBarColor('#121212')}
              {tabData.map(tab => (
                <>
                  <Tab.Screen
                    options={{
                      tabBarLabel: tab.name,
                      tabBarLabelStyle: {fontSize: 9, bottom: 7},
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
            ):
            <AuthStackNavigator />
            }
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 0,
    height: 65,
    borderTopColor: '#121212',
    backgroundColor: '#121212',
  },
});

export default App;
