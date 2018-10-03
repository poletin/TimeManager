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
  Footer,
  Fab
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import HolidayList from "../container/holiday/HolidayList";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

export default class HolidayScreen extends Component<Props> {
  static navigationOptions = {
    drawerLabel: "Freie Tage",
    drawerIcon: () => <Icon name="calendar" />
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
            <Title>Freie Tage</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <HolidayList />
        </Content>
        <Footer>
          <Fab
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => {
              this.props.navigation.navigate("NewHoliday");
            }}
          >
            <Icon type="MaterialIcons" name="add" />
          </Fab>
        </Footer>
      </Container>
    );
  }
}
