import React, { Component } from "react";
import { Text, Button, View } from "native-base";

type LoginProps = {
  onLoginAnon: () => {};
  busy: boolean;
};
export default class Hello extends Component<LoginProps> {
  render() {
    return (
      <Button
        onPress={() => this.props.onLoginAnon()}
        disabled={this.props.busy}
      >
        <Text>Login</Text>
      </Button>
    );
  }
}
