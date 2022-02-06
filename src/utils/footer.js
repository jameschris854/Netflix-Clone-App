import React from 'react';

import Games from '../screens/Games.js';
import News from '../screens/News.js';
import Laughs from '../screens/Laughs.js';
import Downloads from '../screens/Dowloads.js';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { HomeStackNavigator } from '../Navigators/StackNavigator.js';

const ICON_SIZE = 26

export default tabData = [
    {
      name: 'Home',
      component: HomeStackNavigator,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons name="home-variant" size={ICON_SIZE} color={color} />
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
        <Ionicons name="game-controller" size={ICON_SIZE} color={color} />
      ),
      unFocusedIcon: ({color}) => (
        <Ionicons name="game-controller-outline" size={ICON_SIZE} color={color} />
      ),
    },
    {
      name: 'News',
      component: News,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="play-box-multiple"
          size={ICON_SIZE}
          color={color}
        />
      ),
      unFocusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="play-box-multiple-outline"
          size={ICON_SIZE}
          color={color}
        />
      ),
    },
    {
      name: 'Laughs',
      component: Laughs,
      focusedIcon: ({color}) => (
        <FontAwesome5 name="smile" size={ICON_SIZE} color={color} />
      ),
      unFocusedIcon: ({color}) => (
        <FontAwesome name="smile-o" size={ICON_SIZE} color={color} />
      ),
    },
    {
      name: 'Downloads',
      component: Downloads,
      focusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="arrow-down-circle"
          size={ICON_SIZE}
          color={color}
        />
      ),
      unFocusedIcon: ({color}) => (
        <MaterialCommunityIcons
          name="arrow-down-circle-outline"
          size={ICON_SIZE}
          color={color}
        />
      ),
    },
  ];