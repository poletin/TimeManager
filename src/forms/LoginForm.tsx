import React, { Component } from "react";
import { InjectedFormProps, reduxForm, FormErrors, Field } from "redux-form";
import { Input, View, Text, Button } from "native-base";
import { StyleSheet } from "react-native";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";

type Props = InjectedFormProps<auth.LoginFormData, {}, string> & {
  onSubmit?: (data: auth.LoginFormData) => void;
};
class LoginForm extends Component<Props> {
  passwordInput: Input | null = null;
  render() {
    return (
      <View style={styles.form}>
        <Field name="email" label="E-Mail" component={EmailInput} />
        <Field name="pwd" label="Passwort" component={PasswordInput} />
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
}

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
