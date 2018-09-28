import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../actions";
import { changeUserSettings } from "../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import UserSettingsForm from "../../forms/UserSettingsForm";

type Props = {
  user: user.User;
  onSubmit: (data: user.User) => void;
};
class UserSettings extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UserSettingsForm
          initialValues={this.props.user}
          onSubmit={data => {
            this.props.onSubmit(data);
          }}
        />
      </View>
    );
  }
}

function mapStateToProps({ user }: StoreState) {
  return {
    user
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    onSubmit: (data: user.User) => dispatch(changeUserSettings(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
