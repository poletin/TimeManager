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
import TimesList from "../container/insights/TimesList";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class InsightsScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Insights",
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
            <Title>Insights</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {this.props.navigation.getParam("from", "drawer") === "drawer" ? (
            <CategorySelection />
          ) : null}

          <TimesList />
        </Content>
      </Container>
    );
  }
}
