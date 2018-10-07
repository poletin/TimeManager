import React, { Component } from "react";
import { View, Fab, Icon, ListItem } from "native-base";
import { InjectedFormProps, Field, FormErrors, reduxForm } from "redux-form";
import TextInput from "./components/TextInput";

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
