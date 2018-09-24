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
import SplashScreen from "./src/screens/SplashScreen";
import Sidebar from "./src/components/sidebar/Sidebar";

const MyApp = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Notifications: {
      screen: NotificationsScreen
    },
    Settings: {
      screen: UserSettingsScreen
    }
  },
  {
    contentComponent: Sidebar
  }
);

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
  status: auth.Status;
};

class LoginDeciderComponent extends Component<DeciderProps> {
  componentWillMount() {
    checkLoggedIn();
  }

  render() {
    switch (this.props.status) {
      case "checking":
        return <SplashScreen />;
      case "logged in":
      case "logging out":
        return <MyApp />;
      case "logged out":
      case "logging in":
        return <LoginScreen />;
    }
    return <LoginScreen />;
  }
}

function mapStateToProps({ auth: { status } }: StoreState) {
  return {
    status
  };
}

const LoginDecider = connect(mapStateToProps)(LoginDeciderComponent);
