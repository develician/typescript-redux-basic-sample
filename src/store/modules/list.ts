import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const SET_INPUT = 'list/SET_INPUT';
const INSERT = 'list/INSERT';

let id = 0;

export type Info = {
    text: string;
    id: number;
};

export const listActions = {
    setInput: createAction<string, string>(SET_INPUT, text => text),
    insert: createAction<Info, string>(INSERT, text => {
        const info: Info = {
            id,
            text
        };
        id += 1;
        return info;
    }),
};

type SetInputAction = ReturnType<typeof listActions.setInput>;
type InsertAction = ReturnType<typeof listActions.insert>;

export type ListState = {
    list: Info[];
    input: string;
};

const initialState: ListState = {
    list: [],
    input: '',
};

const reducer = handleActions<ListState, any>({
    [SET_INPUT]: (state, action: SetInputAction) => {
        return produce(state, draft => {
            if(action.payload === undefined) {
                return;
            }
            draft.input = action.payload;
        });
    },
    [INSERT]: (state, action: InsertAction) => {
        return produce(state, draft => {
            if(!action.payload) {
                return;
            }
            draft.list.push(action.payload);
        });
    }
}, initialState);

export default reducer;