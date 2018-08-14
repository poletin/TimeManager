/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationScreen';

const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Notifications: {
    screen: NotificationsScreen,
  },
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
     <MyApp />
    );
  }
}
