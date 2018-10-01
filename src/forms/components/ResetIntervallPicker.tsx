import React, { Component } from "react";
import { WrappedFieldProps } from "redux-form";
import { Item, Label, Input, Text, Picker } from "native-base";

type Props = WrappedFieldProps & {
  label: string;
  name: string;
};

export default class ResetIntervallPicker extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const input = this.props.input;
    const label = this.props.label;
    const touched = this.props.meta.touched;
    const error = this.props.meta.error;
    const warning = this.props.meta.warning;
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
      onValueChange(value: string) {
        input.onChange(value);
      }
    };

    return (
      <Item error={hasError}>
        <Picker
          note
          mode="dropdown"
          style={{ width: 120 }}
          selectedValue={input.value}
          {...newInput}
        >
          <Picker.Item label="Tag" value="days" />
          <Picker.Item label="Woche" value="weeks" />
          <Picker.Item label="Monat" value="months" />
          <Picker.Item label="Jahr" value="years" />
        </Picker>
      </Item>
    );
  }
}
