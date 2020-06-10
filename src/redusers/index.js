import { combineReducers } from 'redux';

import { tasks } from './tasks';
import { activeFilter } from './activeFilter';

export const appRedusers = combineReducers({
    tasks,
    activeFilter
});