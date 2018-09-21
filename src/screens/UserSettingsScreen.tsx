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
import NameSettings from "../container/user/settings/NameSettings";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import SaveSettings from "../container/user/settings/SaveSettings";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};
export default class UserSettingsScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Benutzereinstellungen",
    drawerIcon: () => <Icon name="settings" />
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
            <Title>Benutzereinstellungen</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <NameSettings />
          <SaveSettings />
        </Content>
      </Container>
    );
  }
}
