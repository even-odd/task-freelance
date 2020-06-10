import { filterActions } from '../consts/actionTypes';

// args:
// name: string
// payload: {
//     type: EFilterProp 
//     value: EPriority | EStatus | reverse: boolean | executor.id 
// }
export const setFilterProp = (name, value) => dispatch => {
    dispatch({type: filterActions.SET_FILTER_PROP, property: {name, value}});
}; 