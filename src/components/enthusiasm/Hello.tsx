import React, { Component } from "react";
import { Text, Button, View } from "native-base";

type HelloProps = {
    level: number;
    onIncrement: () => {},
    onDecrement: () => {}
};
export default class Hello extends Component<HelloProps> {
  constructor(props: HelloProps) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Hallo {getExclamationMarks(this.props.level)}</Text>
        <Button onPress={() => this.props.onIncrement()}>
          <Text>+</Text>
        </Button>
        <Button onPress={() => this.props.onDecrement()}>
          <Text>-</Text>
        </Button>
      </View>
    );
  }
}

function getExclamationMarks(count: number) {
    return Array(count + 1).join("!");
  }
