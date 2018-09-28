import React from "react";
import { WrappedFieldProps } from "redux-form";
import { Item, Label, Input, Text } from "native-base";

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
    }
  };

  return (
    <Item error={hasError}>
      <Label>{label}</Label>
      <Input {...newInput} />
      {hasError ? <Text>{error}</Text> : <Text />}
    </Item>
  );
};
