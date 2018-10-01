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
            {this.props.navigation.getParam("from", "drawer") === "drawer" ? (
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon name="menu" />
              </Button>
            ) : (
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="arrow-back" />
              </Button>
            )}
          </Left>
          <Body>
            <Title>Kategorieeinstellungen</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          {this.props.navigation.getParam("from", "drawer") === "drawer" ? (
            <CategorySelection />
          ) : null}

          <CategorySettings />
        </Content>
      </Container>
    );
  }
}
