// React
import { useReducer } from 'react';
// Types
import {
    AppConfigType,
    AppStateType
} from 'common/type';

let timeout: NodeJS.Timeout;

/**
 * A normal react useReducer wrapped inside our own UNDO/REDO Reducer as middleware
 * for updating the UNDO/REDO states automatically
 */
export const useAppReducer = (
    reducer: any,
    initialState: AppStateType,
    passedConfig: AppConfigType = {}
) => {
    const initialStateWithUndoRedo = {
        ...initialState,
    };

    const undoRedoResetReducer = (state: any, action: any) => {
        return reducer(state, action);
    };

    return useReducer(
        undoRedoResetReducer,
        initialStateWithUndoRedo
    );
};

export default useAppReducer;
