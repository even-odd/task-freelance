import { EStatus, EPriority } from '../consts/enums';
import { taskTypeActions } from '../consts/actionTypes';

// Временные данные
const initialTasksState = [
    {
        id: 0, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
        title: 'mem0',
        status: EStatus.Await,
        priority: EPriority.Wish,
        executors: [],
        timeBegin: new Date('2020-05-30'),
        timeEnd: new Date('2020-06-05')
    },
    {
        id: 1, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
        title: 'mem1',
        status: EStatus.Done,
        priority: EPriority.Wish,
        executors: [],
        timeBegin: new Date('2020-05-30'),
        timeEnd: new Date('2020-06-05')
    },
    {
        id: 2, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
        title: '',
        status: EStatus.Delaye,
        priority: EPriority.Medium,
        executors: [],
        timeBegin: new Date('2020-05-30'),
        timeEnd: new Date('2020-06-05')
    },
    {
        id: 3, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
        title: 'mem2',
        status: EStatus.During,
        priority: EPriority.Important,
        executors: [],
        timeBegin: new Date('2020-05-30'),
        timeEnd: new Date('2020-06-05')
    },
    {
        id: 4, // поле необходимо для связи задачи с SimpleTask и AdvancedTask
        title: '',
        status: EStatus.Done,
        priority: EPriority.Critical,
        executors: [],
        timeBegin: new Date('2020-05-30'),
        timeEnd: new Date('2020-06-05')
    }
];

export const tasks = (state = initialTasksState, action) => {
    switch(action.type) {
        case taskTypeActions.SAVE_TASK:
            let found = false;
            let newState = state.map(task => {
                if(task.id === action.task.id) {
                    found = true;
                    return action.task;
                }
                return task;
            });
            
            return (found) ? newState : [...state, action.task];
        case taskTypeActions.DEL_TASK:
            return state.filter((task) => task.id !== action.id);
        default: 
            return state;
    };
};