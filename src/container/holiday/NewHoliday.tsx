import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../actions";
import { saveHoliday, fetchHolidays } from "../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import NewHolidayForm from "../../forms/NewHolidayForm";

type Props = {
  onSubmit: (data: holidays.Holiday) => void;
};
class NewHoliday extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NewHolidayForm
          onSubmit={(data: holidays.Holiday) => {
            console.log("SubmitContainer", data.name);
            this.props.onSubmit(data);
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<actions.HolidayAction>) {
  return {
    onSubmit: (data: holidays.Holiday) => {
      console.log(dispatch(saveHoliday(data)));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewHoliday);
