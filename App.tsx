/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationScreen";
import { Provider, connect } from "react-redux";
import store from "./src/store";
import LoginScreen from "./src/screens/LoginScreen";
import { StoreState } from "./src/reducers";
import UserSettingsScreen from "./src/screens/UserSettingsScreen";
import { checkLoggedIn } from "./src/api";

const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Notifications: {
    screen: NotificationsScreen
  },
  Settings: {
    screen: UserSettingsScreen
  }
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <LoginDecider />
      </Provider>
    );
  }
}

type DeciderProps = {
  loggedIn: boolean;
};

class LoginDeciderComponent extends Component<DeciderProps> {
  componentWillMount() {
    checkLoggedIn();
  }

  render() {
    if (this.props.loggedIn) {
      return <MyApp />;
    }
    return <LoginScreen />;
  }
}

function mapStateToProps({ auth: { state } }: StoreState) {
  return {
    loggedIn: state === "logged in"
  };
}

const LoginDecider = connect(mapStateToProps)(LoginDeciderComponent);
