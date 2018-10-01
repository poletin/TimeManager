import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../actions";
import { addCategory } from "../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import CategorySettingsForm from "../../forms/CategorySettingsForm";

type Props = {
  onSubmit: (data: categories.SingleSettings) => void;
};
class NewCategory extends Component<Props> {
  render() {
    const initialValues: categories.SingleSettings = {
      name: "",
      isIntervall: false,
      weeklyTarget: "40",
      activeDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      resetIntervall: {
        unit: "weeks",
        amount: "0"
      }
    };
    return (
      <View style={{ flex: 1 }}>
        <CategorySettingsForm
          initialValues={initialValues}
          onSubmit={data => {
            this.props.onSubmit(data);
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    onSubmit: (data: categories.SingleSettings) => dispatch(addCategory(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewCategory);
