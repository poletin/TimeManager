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
import NewHoliday from "../container/holiday/NewHoliday";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class NewHolidayScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Neue Abwesenheit",
    drawerIcon: () => <Icon name="calendar" />
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Holidays")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Neue Abwesenheit</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <NewHoliday />
        </Content>
      </Container>
    );
  }
}
