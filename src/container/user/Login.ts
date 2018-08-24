import Login from '../../components/user/Login';
import * as actions from '../../actions/';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
    return {
        onLoginAnon: () => dispatch(actions.userSignInAnon())
    };
}

export default connect(null, mapDispatchToProps)(Login);