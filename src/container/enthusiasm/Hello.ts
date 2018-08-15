import Hello from '../../components/enthusiasm/Hello';
import * as actions from '../../actions/';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { Dispatch } from 'redux';

export function mapStateToProps({ enthusiasm: {level} }: StoreState) {
    return {
        level
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm(10)),
        onDecrement: () => dispatch(actions.decrementEnthusiasm(5)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);