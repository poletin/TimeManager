/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationScreen';
import { Provider } from 'react-redux';
import store from './src/store';

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
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
