import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../actions";
import { addCategory } from "../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import CategorySettingsForm from "../../forms/CategorySettingsForm";
import BusyOverlay from "../../components/commons/BusyOverlay";

type Props = {
  onSubmit: (data: categories.SingleSettings) => void;
  isLoading: boolean;
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
        {this.props.isLoading ? <BusyOverlay /> : undefined}
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
function mapStateToProps({ category: { isLoading } }: StoreState) {
  return {
    isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    onSubmit: (data: categories.SingleSettings) => dispatch(addCategory(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCategory);
