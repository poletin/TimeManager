import * as actions from "../../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../reducers";
import React, { Component } from "react";
import { Text, Button, View } from "native-base";
import { StyleSheet } from "react-native";
import Logo from "../../components/commons/Logo";
import LoginForm from "../../forms/LoginForm";
import BusyOverlay from "../../components/commons/BusyOverlay";

type Props = {
  onLoginAnon: () => {};
  onSignIn: (data: auth.LoginFormData) => void;
  busy: boolean;
};
class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.all}>
        <Logo height={250} />
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

function mapStateToProps({ auth: { busy } }: StoreState) {
  return {
    busy
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
  return {
    onLoginAnon: () => dispatch(actions.userSignInAnon()),
    onSignIn: (data: auth.LoginFormData) =>
      dispatch(actions.userSignInEmail(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
