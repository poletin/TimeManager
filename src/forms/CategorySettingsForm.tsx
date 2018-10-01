import React, { Component } from "react";
import {
  Item,
  View,
  Label,
  Input,
  Text,
  Button,
  Container,
  Icon,
  Fab,
  Content,
  Footer,
  ListItem
} from "native-base";
import {
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  FormErrors,
  reduxForm,
  getFormValues
} from "redux-form";
import { func } from "prop-types";
import Categories from "../container/categories/Categories";
import NumberInput from "./components/NumberInput";
import TextInput from "./components/TextInput";
import Checkbox from "./components/Checkbox";
import ResetIntervallPicker from "./components/ResetIntervallPicker";
import Switch from "./components/Switch";
import store from "../store";

type Props = InjectedFormProps<categories.SingleSettings, {}, string> & {
  onSubmit?: (data: categories.SingleSettings) => void;
};

export class CategorySettingsForm extends Component<Props> {
  render() {
    const state = store.getState();
    // Get the form values using the redux-forms getFormValues selector function
    const formValue = getFormValues("categorySettings")(
      state
    ) as categories.SingleSettings;

    return (
      <View style={{ flex: 1 }}>
        <ListItem>
          <Field name="name" label="Name" component={TextInput} />
        </ListItem>

        <ListItem>
          <Field name="weeklyTarget" label="Zielzeit" component={NumberInput} />
        </ListItem>

        <ListItem>
          <Field
            name="isIntervall"
            label="Regelmäßig zurücksetzen?"
            component={Switch}
            type="checkbox"
          />
        </ListItem>
        <ListItem>
          {formValue && formValue.isIntervall
            ? getResetIntervall()
            : getActiveDays()}
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

function validate(
  values: categories.SingleSettings
): FormErrors<categories.SingleSettings> {
  let errors: FormErrors<categories.SingleSettings> = {};
  if (!values.name) {
    errors.name = "Name nicht leer!";
  }
  if (!values.weeklyTarget) {
    errors.weeklyTarget = "Wochenstunden nicht leer!";
  }
  return errors;
}

export default reduxForm({
  form: "categorySettings",
  validate
})(CategorySettingsForm);

function getActiveDays() {
  return (
    <View style={{ width: "100%" }}>
      <Text style={{ fontSize: 18 }}>Arbeitstage</Text>
      <Field name="activeDays.monday" label="Montag" component={Checkbox} />

      <Field name="activeDays.tuesday" label="Dienstag" component={Checkbox} />

      <Field
        name="activeDays.wednesday"
        label="Mittwoch"
        component={Checkbox}
      />

      <Field
        name="activeDays.thursday"
        label="Donnerstag"
        component={Checkbox}
      />

      <Field name="activeDays.friday" label="Freitag" component={Checkbox} />

      <Field name="activeDays.saturday" label="Samstag" component={Checkbox} />

      <Field name="activeDays.sunday" label="Sonntag" component={Checkbox} />
    </View>
  );
}

function getResetIntervall() {
  return (
    <View>
      <Text style={{ fontSize: 18 }}>Zurücksetzintervall</Text>
      <Field
        name="resetIntervall.unit"
        label="Zurücksetzen pro"
        component={ResetIntervallPicker}
      />
      <Field
        name="resetIntervall.amount"
        label="Anzahl"
        component={NumberInput}
      />
    </View>
  );
}
