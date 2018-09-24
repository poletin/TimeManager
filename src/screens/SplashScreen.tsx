import React, { Component } from "react";
import { Container, Content } from "native-base";
import Login from "../container/user/Login";
import { StyleSheet, View, Image } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <Container style={{ alignItems: "center" }}>
        <Content contentContainerStyle={{ flexGrow: 1 }} padder>
          <View style={styles.centered}>
            <Image
              style={styles.stretch}
              resizeMode="contain"
              source={require("../assets/logo.png")}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stretch: {
    flex: 1,
    height: 150,
    width: 150
  }
});
