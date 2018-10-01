import React, { Component } from "react";
import {
  Item,
  View,
  Label,
  Input,
  Text,
  Button,
  Fab,
  Icon,
  CheckBox,
  ListItem
} from "native-base";
import {
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  FormErrors,
  reduxForm
} from "redux-form";
import Checkbox from "./components/Checkbox";
import TextInput from "./components/TextInput";
import Switch from "./components/Switch";

type Props = InjectedFormProps<user.User, {}, string> & {
  onSubmit?: (data: user.User) => void;
};

class CategorySettingsForm extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem>
          <Field name="name" label="Name" component={TextInput} />
        </ListItem>
        <ListItem>
          <Field
            label="Dualer Student"
            name="dualStudent"
            type="checkbox"
            component={Switch}
          />
        </ListItem>
        <Fab
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            this.props.handleSubmit(data => {
              if (this.props.onSubmit) {
                this.props.onSubmit(data);
              }
            })();
          }}
        >
          <Icon type="MaterialIcons" name="save" />
        </Fab>
      </View>
    );
  }
}

function validate(values: user.User): FormErrors<user.User> {
  let errors: FormErrors<user.User> = {};
  if (!values.name) {
    errors.name = "Name nicht leer!";
  }
  return errors;
}

export default reduxForm({
  form: "userSettings",
  validate
})(CategorySettingsForm);
