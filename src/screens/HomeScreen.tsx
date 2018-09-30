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
  Content
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Categories from "../container/categories/Categories";
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
          <Categories navigate={this.props.navigation.navigate} />
        </Content>
      </Container>
    );
  }
}
