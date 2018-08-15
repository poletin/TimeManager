import {
    EnthusiasmAction,
    INCREMENT_ENTHUSIASM,
    DECREMENT_ENTHUSIASM
} from '../actions';

export interface EnthusiasmState {
    level: number
}

const helloDataInitial: EnthusiasmState = {
    level: 7
};

export default function enthusiasm(
    state: EnthusiasmState = helloDataInitial,
    action: EnthusiasmAction
): EnthusiasmState {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, level: state.level + action.amount };
        case DECREMENT_ENTHUSIASM:
            return { ...state, level: Math.max(1, state.level - action.amount) };
        default:
            return state;
    }
}