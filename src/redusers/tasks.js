import { taskTypeActions } from '../consts/actionTypes';
import { getUpdatedTaskList } from '../utils';

const initialTasksState = [];

export const tasks = (state = initialTasksState, action) => {
    switch(action.type) {
        case taskTypeActions.SAVE_TASK:
            console.debug('task.reduser - action: ', action);
            return getUpdatedTaskList(state, action.task);
        case taskTypeActions.DEL_TASK:
            return state.filter((task) => task.id !== action.id);
        default: 
            return state;
    };
};