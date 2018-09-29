import * as actions from "../../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../reducers";
import React, { Component } from "react";
import { Text, Button, View, Input, Item } from "native-base";
import { StyleSheet } from "react-native";
import Logo from "../../components/commons/Logo";
import LoginForm from "../../forms/LoginForm";
import BusyOverlay from "../../components/commons/BusyOverlay";
import { MaterialDialog } from "react-native-material-dialog";

type Props = {
  onLoginAnon: () => {};
  onSignIn: (data: auth.LoginFormData) => void;
  onSignUp: (data: auth.LoginFormData) => void;
  busy: boolean;
};
type State = {
  userNameDialogVisible: boolean;
  cachedLoginData?: auth.LoginFormData;
};
class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userNameDialogVisible: false
    };
  }
  render() {
    return (
      <View style={styles.all}>
        <Logo height={250} />
        <LoginForm
          onSubmit={data => {
            if (data.pressedButton! === "signUp") {
              this.setState({
                userNameDialogVisible: true,
                cachedLoginData: data
              });
            } else {
              this.props.onSignIn(data);
            }
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
        <MaterialDialog
          title="Bitte Namen eingeben"
          visible={this.state.userNameDialogVisible}
          okLabel="Weiter"
          cancelLabel="Abbrechen"
          onOk={() => {
            this.setState({ userNameDialogVisible: false });
            if (this.state.cachedLoginData) {
              this.props.onSignUp(this.state.cachedLoginData);
            }
          }}
          onCancel={() => this.setState({ userNameDialogVisible: false })}
        >
          <Item regular>
            <Input
              placeholder="Name"
              value={
                this.state.cachedLoginData
                  ? this.state.cachedLoginData.name || ""
                  : ""
              }
              onChangeText={(newText: string) => {
                this.setState({
                  cachedLoginData: {
                    ...this.state.cachedLoginData!,
                    name: newText
                  }
                });
              }}
            />
          </Item>
        </MaterialDialog>
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
      dispatch(actions.userSignInEmail(data)),
    onSignUp: (data: auth.LoginFormData) =>
      dispatch(actions.userSignUpEmail(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
