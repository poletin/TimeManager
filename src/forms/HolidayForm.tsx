import React, { Component } from "react";
import { View, Text, Icon, Fab, ListItem } from "native-base";
import {
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  FormErrors,
  reduxForm,
  getFormValues
} from "redux-form";
import TextInput from "./components/TextInput";
import Switch from "./components/Switch";
import store from "../store";

type Props = InjectedFormProps<holidays.Holiday, {}, string> & {
  onSubmit?: (data: holidays.Holiday) => void;
};

export class HolidayForm extends Component<Props> {
  render() {
    const state = store.getState();
    // Get the form values using the redux-forms getFormValues selector function
    const formValue = getFormValues("holidays")(state) as holidays.Holiday;

    return (
      <View style={{ flex: 1 }}>
        <ListItem>
          <Field name="name" label="Name" component={TextInput} />
        </ListItem>

        <ListItem>
          <Field
            name="isFullDay"
            label="GanzerTag?"
            component={Switch}
            type="checkbox"
          />
        </ListItem>
        <ListItem>
          {formValue && formValue.isFullDay ? getFullDay() : getHalfDay()}
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

type FieldProps = WrappedFieldProps & {
  label: string;
  name: string;
};

function validate(values: holidays.Holiday): FormErrors<holidays.Holiday> {
  let errors: FormErrors<holidays.Holiday> = {};
  if (!values.name) {
    errors.name = "Name nicht leer!";
  }
  return errors;
}

export default reduxForm({
  form: "holidays",
  validate
})(HolidayForm);

function getFullDay() {
  return (
    <View>
      <Text>FullDay</Text>
    </View>
  );
}

function getHalfDay() {
  return (
    <View>
      <Text>HalfDay</Text>
    </View>
  );
}
