import React from "react";
import { Button, Text } from "native-base";
import { GestureResponderEvent } from "react-native";

type Props = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};
export default (props: Props) => {
  return (
    <Button full rounded style={{ marginTop: 10 }} onPress={props.onPress}>
      <Text>{props.text}</Text>
    </Button>
  );
};
