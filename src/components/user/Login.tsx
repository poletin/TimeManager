import React, { Component } from "react";
import { Text, Button, View } from "native-base";

type LoginProps = {
    onLoginAnon: ()  => {};
};
export default class Hello extends Component<LoginProps> {

  render() {
    return (
      <View>
        <Button onPress={() => this.props.onLoginAnon()}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}
