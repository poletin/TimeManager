import React, { Component } from "react";
import { Container, Content } from "native-base";
import Login from "../container/user/Login";
import { StyleSheet, View, Dimensions } from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <Container style={{ alignItems: "center" }}>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.button}>
            <Login />
          </View>
        </Content>
      </Container>
    );
  }
}

var { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
