/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, RefObject } from "react";
import {
  createDrawerNavigator,
  NavigationScreenProp,
  NavigationState,
  NavigationContainer,
  NavigationContainerComponent
} from "react-navigation";
import HomeScreen from "./src/screens/HomeScreen";
import { Provider, connect } from "react-redux";
import store from "./src/store";
import LoginScreen from "./src/screens/LoginScreen";
import { StoreState } from "./src/reducers";
import UserSettingsScreen from "./src/screens/UserSettingsScreen";
import { checkLoggedIn } from "./src/api";
import SplashScreen from "./src/screens/SplashScreen";
import Sidebar from "./src/components/sidebar/Sidebar";
import CategorySettingsScreen from "./src/screens/CategorySettingsScreen";
import { Root } from "native-base";
import CategoryInsightsScreen from "./src/screens/CategoryInsightsScreen";
import NewCategoryScreen from "./src/screens/NewCategoryScreen";
import NavigationService from "./src/utils/NavigationService";
import CategoryDetailsScreen from "./src/screens/CategoryDetailsScreen";
import HolidayScreen from "./src/screens/HolidayScreen";
import NewHolidayScreen from "./src/screens/NewHolidayScreen";
import NotificationService from "./src/utils/NotificationService";

const MyApp = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Settings: {
      screen: UserSettingsScreen
    },
    CategorySettings: {
      screen: CategorySettingsScreen
    },
    CategoryInsights: {
      screen: CategoryInsightsScreen
    },
    NewCategory: {
      screen: NewCategoryScreen
    },
    CategoryDetails: {
      screen: CategoryDetailsScreen
    },
    Holidays: {
      screen: HolidayScreen
    },
    NewHoliday: {
      screen: NewHolidayScreen
    }
  },
  {
    contentComponent: Sidebar
  }
);

type Props = {};
export default class App extends Component<Props> {
  notificationDisplayedListener: () => any = () => {};
  notificationListener: () => any = () => {};
  notificationOpenedListener: () => any = () => {};

  async componentDidMount() {
    NotificationService.handleInitialNotification();
    this.notificationListener = NotificationService.getNotificationListener();
    this.notificationOpenedListener = NotificationService.getNotificationOpenedListener();
    this.notificationDisplayedListener = NotificationService.getNotificationDisplayedListener();
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return (
      <Root>
        <Provider store={store}>
          <LoginDecider />
        </Provider>
      </Root>
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
        return (
          <MyApp
            ref={(navigatorRef: NavigationContainerComponent) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        );
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
