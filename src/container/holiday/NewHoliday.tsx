import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../actions";
import { saveHoliday, fetchHolidays } from "../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import NewHolidayComponent from "../../components/NewHolidayComponent";
import BusyOverlay from "../../components/commons/BusyOverlay";

type Props = {
  onSubmit: (data: holidays.Holiday) => void;
  isLoading: boolean;
};
class NewHoliday extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.isLoading ? <BusyOverlay /> : undefined}
        <NewHolidayComponent
          onSubmit={(data: holidays.Holiday) => {
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

function mapDispatchToProps(dispatch: Dispatch<actions.HolidayAction>) {
  return {
    onSubmit: (data: holidays.Holiday) => {
      dispatch(saveHoliday(data));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewHoliday);
