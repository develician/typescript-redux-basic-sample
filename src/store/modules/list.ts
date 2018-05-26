import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const SET_INPUT = 'list/SET_INPUT';
const INSERT = 'list/INSERT';
const CHECK = 'list/CHECK';
const REMOVE = 'list/REMOVE';

let id = 0;

export type Info = {
    text: string;
    id: number;
    done: boolean;
};

export const listActions = {
    setInput: createAction<string, string>(SET_INPUT, text => text),
    insert: createAction<Info, string>(INSERT, text => {
        const info: Info = {
            id,
            text,
            done: false
        };
        id += 1;
        return info;
    }),
    check: createAction<number>(CHECK),
    remove: createAction<number>(REMOVE),
};

type SetInputAction = ReturnType<typeof listActions.setInput>;
type InsertAction = ReturnType<typeof listActions.insert>;
type CheckAction = ReturnType<typeof listActions.check>;
type RemoveAction = ReturnType<typeof listActions.remove>;

export type ListState = {
    list: Info[];
    input: string;
};

const initialState: ListState = {
    list: [],
    input: ''
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
    },
    [CHECK]: (state, action: CheckAction) => {
        return produce(state, draft => {
            if(action.payload === undefined) {
                return;
            }
            
            const index = state.list.findIndex(todo => todo.id === action.payload);
            draft.list[index].done = !draft.list[index].done;
        });
    },
    [REMOVE]: (state, action: RemoveAction) => {
        return produce(state, draft => {
            if(action.payload === undefined) {
                return;
            }
            const index = state.list.findIndex(todo => todo.id === action.payload);
            draft.list.splice(index - 1, 1);
        });
    }
}, initialState);

export default reducer;