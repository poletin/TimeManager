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
    return (
      <View style={{ flex: 1 }}>
        <CategorySettingsForm
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
