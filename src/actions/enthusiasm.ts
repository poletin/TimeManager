export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;
export interface IncrementEnthusiasm {
    type: INCREMENT_ENTHUSIASM;
    amount: number;
}
export function incrementEnthusiasm(amount: number): IncrementEnthusiasm {
    return {
        type: INCREMENT_ENTHUSIASM,
        amount: amount
    };
}

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;
export interface DecrementEnthusiasm {
    type: DECREMENT_ENTHUSIASM;
    amount: number;
}
export function decrementEnthusiasm(amount: number): DecrementEnthusiasm {
    return {
        type: DECREMENT_ENTHUSIASM,
        amount: amount
    };
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;