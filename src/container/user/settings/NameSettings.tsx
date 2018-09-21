import * as actions from "../../../actions/";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TextField from "../../../components/commons/TextField";
import { StoreState } from "../../../reducers";
import { userSettingChanged } from "../../../actions/";

export function mapStateToProps({ user }: StoreState) {
  const value = user.name;
  return {
    label: "Name",
    value
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    onChange: (value: string) => dispatch(userSettingChanged("name", value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextField);
