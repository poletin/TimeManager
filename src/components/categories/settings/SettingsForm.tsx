import React, { Component } from "react";
import { Item, View, Label, Input, Text, Button } from "native-base";
import {
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  FormErrors,
  reduxForm
} from "redux-form";
import { func } from "prop-types";
import Categories from "../../../container/categories/Categories";

type Props = InjectedFormProps<categories.SingleSettings, {}, string> & {
  onSubmit?: (data: categories.SingleSettings) => void;
};

class SettingsForm extends Component<Props> {
  render() {
    return (
      <View>
        <Field name="name" label="Name" component={this.renderInput} />
        <Button
          primary
          onPress={data => {
            this.props.handleSubmit(data => {
              if (this.props.onSubmit) {
                this.props.onSubmit(data);
              }
            })(data);
          }}
        >
          <Text>Speichern</Text>
        </Button>
      </View>
    );
  }
  renderInput({ input, label, meta: { touched, error, warning } }: FieldProps) {
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
  }
}

type FieldProps = WrappedFieldProps & {
  label: string;
  name: string;
};

function validate(
  values: categories.SingleSettings
): FormErrors<categories.SingleSettings> {
  let errors: FormErrors<categories.SingleSettings> = {};
  if (!values.name) {
    errors.name = "Name nicht leer!";
  }
  return errors;
}

export default reduxForm({
  form: "categorySettings",
  validate
})(SettingsForm);
