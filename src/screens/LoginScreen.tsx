import React, { Component } from "react";
import { Container, Content } from "native-base";
import Login from "../container/user/Login";
import { StyleSheet, View, Dimensions } from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <Container style={{ alignItems: "center" }}>
        <Content contentContainerStyle={{ flexGrow: 1 }} padder>
          <View style={styles.button}>
            <Login />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
