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
  Right,
  Text
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import CategorySelection from "../container/categories/settings/CategorySelection";
import TimesList from "../container/insights/TimesList";
import CategoryDetailList from "../container/categories/CategoryDetailList";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class CategoryDetailsScreen extends Component<Props> {
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
            <Title>Details</Title>
          </Body>
          <Right />
        </Header>

        <CategoryDetailList />
      </Container>
    );
  }
}
