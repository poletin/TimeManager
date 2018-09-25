import Login from "../../components/user/Login";
import * as actions from "../../actions/";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../reducers";

function mapStateToProps({ auth: { busy } }: StoreState) {
  return {
    busy
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
  return {
    onLoginAnon: () => dispatch(actions.userSignInAnon()),
    onSignIn: (data: auth.LoginFormData) =>
      dispatch(actions.userSignInEmail(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
