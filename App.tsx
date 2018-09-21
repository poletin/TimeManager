/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationScreen';
import { Provider, connect } from 'react-redux';
import store from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import { mapStateToProps } from './src/container/enthusiasm/Hello';
import { StoreState } from './src/reducers';

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
        <LoginDecider/>
      </Provider>
    );
  }
}

type DeciderProps = {
  loggedIn: boolean
};

class LoginDeciderComponent extends Component<DeciderProps> {
  render() {
    if(this.props.loggedIn){
      return <MyApp/>
    }
    return <LoginScreen/>
  }
}

function mapStateToProps({ user: {loggedIn} }: StoreState) {
  return {
      loggedIn
  };
}

const LoginDecider = connect(mapStateToProps)(LoginDeciderComponent);