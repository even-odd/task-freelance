import { EFilter, ESorting, EFilterProp, EPriority, EStatus } from '../consts/enums';
import { filterTypeActions } from '../consts/actionTypes';

//TODO-advanced: рассмотреть вариант  
const {Filter, Sorting, Reverse, ToFind} = EFilterProp; // интересная задумка 

export const initialFilterState = {
    [ToFind]: '',
    [Filter]: {type: EFilter.None, value: EPriority.Wish},  
    [Sorting]: {type: ESorting.None, value: EStatus.Await},
    [Reverse]: false
};

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