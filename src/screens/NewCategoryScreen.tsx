import React, { Component } from "react";
import {
  Container,
  Content,
  Icon,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import NewCategory from "../container/categories/NewCategory";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class NewCategoryScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Kategorieeinstellungen",
    drawerIcon: () => <Icon name="paper" />
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Neue Kategorie</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <NewCategory />
        </Content>
      </Container>
    );
  }
}
