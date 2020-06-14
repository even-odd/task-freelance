import { filterTypeActions } from '../consts/actionTypes';

export const initialFilterState = {};

export const activeFilter = (state = initialFilterState, action) => {
    switch(action.type) {
        case filterTypeActions.SET_FILTER_PROP: 
            console.debug('reducer SET_FILTER_PROP: OLD state', state);
            console.debug('reducer SET_FILTER_PROP: action', action);
            
            let tmp = {...state, [action.name]: action.data};
            console.debug('reducer SET_FILTER_PROP: NEW state', tmp);
            return tmp;
        default: 
            return state
    };
};