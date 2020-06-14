import { combineReducers } from 'redux';

import { tasks } from './tasks';
import { activeFilter } from './activeFilter';

export const rootReduser = combineReducers({
    tasks,
    activeFilter
});