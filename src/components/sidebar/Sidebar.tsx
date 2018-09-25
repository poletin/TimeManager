import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import HorizontalLine from "../commons/HorizontalLine";
import { userSignOut } from "../../actions";
import store from "../../store";
import Logo from "../commons/Logo";

const pages = [
  {
    name: "Home",
    route: "Home",
    icon: "home"
  },
  {
    name: "Einstellungen",
    route: "Settings",
    icon: "settings"
  }
];
const actions = [
  {
    name: "Log Out",
    action: () => userSignOut(),
    icon: "log-out"
  }
];

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};
export default class SideBar extends Component<Props> {
  render() {
    return (
      <Container>
        <Content style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <Logo />
          <HorizontalLine />
          <List
            style={{ flex: 1 }}
            dataArray={pages}
            renderRow={data => (
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
                {/* {data.types && (
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text style={styles.badgeText}>{`${
                        data.types
                      } Types`}</Text>
                    </Badge>
                  </Right>
                )} */}
              </ListItem>
            )}
          />
          <HorizontalLine />
          <List
            style={{ flex: 1 }}
            dataArray={actions}
            renderRow={action => (
              <ListItem
                button
                noBorder
                onPress={() => store.dispatch(action.action())}
              >
                <Left>
                  <Icon
                    active
                    name={action.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>{action.name}</Text>
                </Left>
                {/* {data.types && (
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text style={styles.badgeText}>{`${
                        data.types
                      } Types`}</Text>
                    </Badge>
                  </Right>
                )} */}
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
});
