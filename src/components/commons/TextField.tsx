import React from "react";
import { Item, Input, View, Label } from "native-base";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};
export default (props: Props) => {
  return (
    <View>
      <Item floatingLabel>
        <Label>{props.label}</Label>
        <Input value={props.value} onChangeText={props.onChange} />
      </Item>
    </View>
  );
};
