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
  Fab,
  Footer
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import Categories from "../container/categories/Categories";
import store from "../store";
import { fetchCategoryData } from "../actions";
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
          <Right>
            <Button
              transparent
              onPress={() => {
                store.dispatch(fetchCategoryData());
              }}
            >
              <Icon name="refresh" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Categories />
        </Content>
        <Footer>
          <Fab
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => {
              this.props.navigation.navigate("NewCategory");
            }}
          >
            <Icon type="MaterialIcons" name="add" />
          </Fab>
        </Footer>
      </Container>
    );
  }
}
