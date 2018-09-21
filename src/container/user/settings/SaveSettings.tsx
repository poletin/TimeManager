import * as actions from "../../../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { saveUserSettings } from "../../../actions";
import Button from "../../../components/commons/Button";

export function mapStateToProps() {
  return {
    text: "Speichern"
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
  return {
    onPress: () => dispatch(saveUserSettings())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);
