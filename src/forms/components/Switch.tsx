import React from "react";
import { WrappedFieldProps } from "redux-form";
import { Item, CheckBox, Label, Switch, Left, Right, Text } from "native-base";

type Props = WrappedFieldProps & {
  label: string;
  name: string;
};
export default ({ input, label, meta: { touched, error, warning } }: Props) => {
  let hasError = false;
  if (touched && error !== undefined) {
    hasError = true;
  }
  const newInput = {
    ...input,
    onBlur: () => {
      input.onBlur(input.value);
    },
    onFocus: () => {
      input.onFocus(input.value);
    },
    onValueChange: () => {
      input.onChange(!input.value);
    }
  };

  return (
    <Item>
      <Left>
        <Text>{label}</Text>
      </Left>
      <Right>
        <Switch {...newInput} />
      </Right>
    </Item>
  );
};
