import React, { Component } from "react";
import { Text, Button, View, Spinner, Container } from "native-base";
import { StyleSheet, Modal } from "react-native";
import LoginForm from "./LoginForm";
import BusyOverlay from "../commons/BusyOverlay";

type LoginProps = {
  onLoginAnon: () => {};
  onSignIn: (data: auth.LoginFormData) => void;
  busy: boolean;
};
export default class Login extends Component<LoginProps> {
  render() {
    return (
      <View style={styles.all}>
        <LoginForm
          onSubmit={data => {
            this.props.onSignIn(data);
          }}
        />
        <View style={{ flex: 0.01 }} />
        <View style={styles.buttonsRow}>
          <Button
            style={styles.button}
            light
            onPress={() => this.props.onLoginAnon()}
          >
            <Text>Ohne Anmeldung weiter</Text>
          </Button>
        </View>
        {this.props.busy ? <BusyOverlay /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    width: "70%",
    justifyContent: "center"
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
