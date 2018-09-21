import React, { Component } from "react";
import { StatusBar } from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import store from "../store";
import { userSignOut, userSignOutSuccess } from "../actions";

type HomeProps = {
  navigation: NavigationScreenProp<NavigationState>;
};
export default class HomeScreen extends Component<HomeProps> {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: () => <Icon name="home" />
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home Screen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Navigation Example</Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Notifications")}
          >
            <Text>Notifications</Text>
          </Button>
          <Button
            onPress={() => {
              // Just a hack!!!
              store.dispatch(userSignOut());
            }}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
