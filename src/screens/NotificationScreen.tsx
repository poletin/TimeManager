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

type HomeProps = {
  navigation: NavigationScreenProp<NavigationState>;
};
export default class NotificationsScreen extends React.Component<HomeProps> {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: () => <Icon name="pulse" />
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
            <Title>Notifications</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button onPress={() => this.props.navigation.goBack()}>
            <Text>Back to Home</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
