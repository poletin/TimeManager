import React from "react";
import { WrappedFieldProps } from "redux-form";
import { Item, CheckBox, Label } from "native-base";

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
    checked: input.value,
    onBlur: () => {
      input.onBlur(input.value);
    },
    onFocus: () => {
      input.onFocus(input.value);
    },
    onPress: () => {
      input.onChange(!input.value);
    }
  };

  return (
    <Item>
      <CheckBox {...newInput} />
      <Label>{label}</Label>
    </Item>
  );
};
