import React, { Component } from "react";
import {
  Item,
  View,
  Label,
  Input,
  Text,
  Button,
  InputGroup,
  Icon,
  Fab
} from "native-base";
import {
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  FormErrors,
  reduxForm
} from "redux-form";
import { func } from "prop-types";
import Categories from "../container/categories/Categories";
import NumberInput from "./components/NumberInput";
import TextInput from "./components/TextInput";
import Checkbox from "./components/Checkbox";
import ResetIntervallPicker from "./components/ResetIntervallPicker";

type Props = InjectedFormProps<categories.SingleSettings, {}, string> & {
  onSubmit?: (data: categories.SingleSettings) => void;
};

class CategorySettingsForm extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Field name="name" label="Name" component={TextInput} />
        <Field
          name="weeklyTarget"
          label="Wochenstunden"
          component={NumberInput}
        />
        <Text style={{ fontSize: 18 }}>Arbeitstage</Text>
        <Field name="activeDays.monday" label="Montag" component={Checkbox} />

        <Field
          name="activeDays.tuesday"
          label="Dienstag"
          component={Checkbox}
        />

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

        <Field
          name="activeDays.saturday"
          label="Samstag"
          component={Checkbox}
        />

        <Field name="activeDays.sunday" label="Sonntag" component={Checkbox} />

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
