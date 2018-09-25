import React, { Component } from "react";
import {
  InjectedFormProps,
  reduxForm,
  FormErrors,
  Field,
  WrappedFieldProps
} from "redux-form";
import { Input, View, Item, Text, Label, Button } from "native-base";
import { StyleSheet } from "react-native";

type Props = InjectedFormProps<auth.LoginFormData, {}, string> & {
  onSubmit?: (data: auth.LoginFormData) => void;
};
class LoginForm extends Component<Props> {
  passwordInput: Input | null = null;
  render() {
    return (
      <View style={styles.form}>
        <Field name="email" label="E-Mail" component={this.renderInput} />
        <Field name="pwd" label="Passwort" component={this.renderInput} />
        <View style={styles.buttonsRow}>
          <Button
            style={styles.button}
            success
            onPress={data => {
              this.props.handleSubmit(data => {
                if (this.props.onSubmit) {
                  data.pressedButton = "signUp";
                  this.props.onSubmit(data);
                }
              })(data);
            }}
          >
            <Text>Registrieren</Text>
          </Button>
          <View style={{ flex: 0.01 }} />
          <Button
            style={styles.button}
            primary
            onPress={data => {
              this.props.handleSubmit(data => {
                if (this.props.onSubmit) {
                  data.pressedButton = "signIn";
                  this.props.onSubmit(data);
                }
              })(data);
            }}
          >
            <Text>Anmelden</Text>
          </Button>
        </View>
      </View>
    );
  }
  renderInput({ input, label, meta: { touched, error, warning } }: FieldProps) {
    var hasError = false;
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
      secureTextEntry: input.name === "pwd"
    };
    return (
      <Item error={hasError}>
        <Label>{label}</Label>
        <Input
          {...newInput}
          keyboardType={input.name === "email" ? "email-address" : "default"}
        />
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    );
  }
}

type FieldProps = WrappedFieldProps & {
  label: string;
  name: string;
};

function validate(values: auth.LoginFormData): FormErrors<auth.LoginFormData> {
  let errors: FormErrors<auth.LoginFormData> = {};

  if (!values.email) {
    errors.email = "E-Mail fehlt!";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "Falsches Format";
  }
  if (!values.pwd) {
    errors.pwd = "Passwort fehlt!";
  } else if (values.pwd.length < 6) {
    errors.pwd = "Zu Kurz";
  }

  return errors;
}

export default reduxForm({
  form: "test",
  validate
})(LoginForm);

const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "center"
  },
  item: {
    flex: 1
  },
  input: {},
  button: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%"
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
