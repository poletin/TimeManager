import { Fab, Icon, ListItem, Text, View } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Field,
  FormErrors,
  formValueSelector,
  InjectedFormProps,
  reduxForm
} from "redux-form";
import Checkbox from "./components/Checkbox";
import NumberInput from "./components/NumberInput";
import ResetIntervallPicker from "./components/ResetIntervallPicker";
import Switch from "./components/Switch";
import TextInput from "./components/TextInput";

type Props = InjectedFormProps<categories.SingleSettings, {}, string> & {
  onSubmit?: (data: categories.SingleSettings) => void;
};

export class CategorySettingsForm extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem>
          <Field name="name" label="Name" component={TextInput} />
        </ListItem>

        <ListItem>
          <Field
            name="weeklyTarget"
            label="Zielzeit (in Stunden)"
            component={NumberInput}
          />
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
          <ActiveDays />
          <ResetIntervall />
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

function validate(
  values: categories.SingleSettings
): FormErrors<categories.SingleSettings> {
  let errors: FormErrors<categories.SingleSettings> = {};
  if (!values.name) {
    errors.name = "Name nicht leer!";
  }
  if (!values.weeklyTarget) {
    errors.weeklyTarget = "Zielzeit nicht leer!";
  }
  return errors;
}

export default reduxForm({
  form: "categorySettings",
  validate
})(CategorySettingsForm);

type SubProps = {
  isIntervall: boolean;
};
const ActiveDaysComp = ({ isIntervall }: SubProps) => {
  return isIntervall ? null : (
    <View style={{ flex: 1 }}>
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
};

const selector = formValueSelector("categorySettings");
const ActiveDays = connect(state => ({
  isIntervall: !!selector(state, "isIntervall")
}))(ActiveDaysComp);

const ResetIntervallComp = ({ isIntervall }: SubProps) => {
  return isIntervall ? (
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
  ) : null;
};

const ResetIntervall = connect(state => ({
  isIntervall: !!selector(state, "isIntervall")
}))(ResetIntervallComp);
