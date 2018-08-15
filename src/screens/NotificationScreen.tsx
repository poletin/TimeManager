import React, { Component } from "react";
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
  Text
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Hello from "../container/enthusiasm/Hello";

type NotiProps = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class NotificationsScreen extends React.Component<
  NotiProps
> {
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
          <Hello/>
        </Content>
      </Container>
    );
  }
}

