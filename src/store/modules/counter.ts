// 액션 타입
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

export const counterActions = {
    increment: (diff: number) => ({
        type: INCREMENT,
        payload: diff
    }),
    decrement: (diff: number) => ({
        type: DECREMENT,
        payload: diff
    })
};

type IncrementAction = ReturnType<typeof counterActions.increment>;
type DecrementAction = ReturnType<typeof counterActions.decrement>;
type Actions = IncrementAction | DecrementAction;

export type CounterState = Readonly<{
    someExtraValue: string,
    value: number
}>;

const initialState: CounterState = {
    someExtraValue: "Hello",
    value: 0
};

export default function reducer(state: CounterState = initialState, action: Actions): CounterState {
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + (action as IncrementAction).payload
            };
        case DECREMENT:
            return {
                ...state,
                value: state.value - (action as DecrementAction).payload
            };
        default:
            return state;
    }

}
