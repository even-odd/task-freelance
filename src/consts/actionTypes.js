// события одинаковы для simpleTask
export const taskTypeActions = {
    SAVE_TASK: 0, // Сохраняет текущее состояние задачи. Если задачи нет, то сохраняет её в store
    DEL_TASK: 1
};

// Для задания всех свойств будет использоваться одно событие
export const filterTypeActions = {
    SET_FILTER_PROP: 30
};

