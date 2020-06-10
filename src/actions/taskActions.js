import { taskTypeActions } from '../consts/actionTypes';

// Task actions - begin
export const saveTask = (task) => dispatch => {
    dispatch({ type: taskTypeActions.SAVE_TASK, task });
};
export const delTask = (id) => dispatch => {
    dispatch({ type: taskTypeActions.DEL_TASK, id });
};
// Task actions - end

// AdvancedTask actions - begin
// export const saveAdvancedTask = (advancedTask) => dispatch => {
//     dispatch({ type: advancedTaskActions.SAVE_AD_TASK, advancedTask });
// };
// AdvancedTask actions - end

export default {
    saveTask,
    delTask
};