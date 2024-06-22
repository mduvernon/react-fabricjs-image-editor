import { actions } from 'common/actions';

export const appReducer = (
    state: any,
    action: { type: string; payload: any }
) => {

    return actions[action.type]
        ? actions[action.type](state, action.payload) || state
        : state
};

export default appReducer;
