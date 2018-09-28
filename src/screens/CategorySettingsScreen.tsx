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
import CategorySelection from "../container/categories/settings/CategorySelection";
import CategorySettings from "../container/categories/settings/CategorySettings";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class CategorySettingsScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Kategorieeinstellungen",
    drawerIcon: () => <Icon name="paper" />
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
            <Title>Kategorieeinstellungen</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <CategorySelection />
          <CategorySettings />
        </Content>
      </Container>
    );
  }
}
