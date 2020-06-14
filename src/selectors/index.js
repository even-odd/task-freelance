// import { createSelector } from 'reselect';
import { EFilter, ESorting } from '../consts/enums';

// TODO: подробно посмотреть на работу селекторов,
// возможно, что они не выполняют свою функцию
// const {Filter, Sorting, Reverse, ToFind} = EFilterProp;

// export const getCurrentFind = (state) => state.activeFilter[ToFind];
// export const getCurrentFilter = (state) => state.activeFilter[Filter];
// export const getCurrentSorting = (state) => state.activeFilter[Sorting];
// export const getCurrentReverse = (state) => state.activeFilter[Reverse];

// export let getCurrentTasks = (state) => state.tasks;

// const pathVisibleFind = 'select Find:';
// let findDone = false;
// export const getVisibleFind = createSelector(
//     [getCurrentFind, getCurrentTasks],
//     // TODO: вынести в отдельную функцию 
//     (doFind, tasks) => {
//         // console.debug(enter);
//         // console.debug(`${pathVisibleFind} doFind: `, doFind);
//         console.debug(`${pathVisibleFind} tasks: `, tasks);
//         findDone = true;
//         if(doFind.localeCompare('') === 0){
//             // console.debug(pathVisibleFind + ' empty find');
//             return tasks;  
//         } 

//         let founds = tasks.filter((task) => {
//             return task.title.indexOf(doFind) !== -1;
//         });

//         if(founds.length > 0) {
//             // console.debug(pathVisibleFind + ' founds', founds);
//             return founds;
//         }

//         // console.debug(pathVisibleFind + " founds does't exist", founds);
//         return tasks;
//     }
// );

// const pathVisibleFilter = 'select Filter:';
// let filterDone = false;
// export const getVisibleFilter = createSelector(
//     [getCurrentFilter, getVisibleFind, getCurrentTasks],
//     (doFilter, tasksAfterFind, defaultTasks) => {
//         // console.debug(enter);
//         // console.debug(`${pathVisibleFilter} doFilter: `, doFilter);
        
//         filterDone = true;
        
//         let tasks = (findDone) ? tasksAfterFind : defaultTasks;
//         console.debug(`${pathVisibleFilter} tasks: `, tasks);

//         let propToFind;
//         let testProp;

//         switch(doFilter.type) {
//             case EFilter.None: 
//                 return tasks;
//             case EFilter.ByExecutor:
//                 // console.debug(`${pathVisibleFilter} - doFilter: ByExecutors`);

//                 propToFind = 'executors'; 
//                 testProp = function(taskExecutors) {
//                     for(let executor in taskExecutors) {
//                         if(executor.id === doFilter.value) return true;
//                     }
//                     return false;
//                 };
//                 break;
//             case EFilter.ByPriority:
//                 // console.debug(`${pathVisibleFilter} - doFilter: ByPriority`);

//                 propToFind = 'priority';
//                 testProp = function(taskPriority) {
//                     return taskPriority === doFilter.value;
//                 };
//                 break;
//             case EFilter.ByStatus:
//                 // console.debug(`${pathVisibleFilter} - doFilter: ByStatus`);

//                 propToFind = 'status';
//                 testProp = function(taskStatus) {
//                     return taskStatus === doFilter.value;
//                 };
//                 break;
//             default: 
//                 console.error(`Err: unknow EFilter type (type: ${doFilter.type})`);
//                 return tasks;
//         }

//         return tasks.filter((task) => {
//             return testProp(task[propToFind]);
//         });
//     }
// );

// const pathVisibleSorting = 'select Sorting:';
// let sortingDone = false;
// export const getVisibleSorting = createSelector(
//     [getCurrentSorting, getVisibleFilter, getCurrentTasks],
//     (doSorting, tasksAfterFilter, defaultTasks) => {
//         // console.debug(enter);
//         // console.debug(`${pathVisibleSorting} doSorting: `, doSorting);
//         sortingDone = true;
        
//         let tasks = (filterDone) ? tasksAfterFilter : defaultTasks;
//         console.debug(`${pathVisibleSorting} tasks: `, tasks);

//         let propToFind;
//         let testProp;

//         switch(doSorting.type) {
//             case ESorting.None: 
//                 return tasks;
//             case ESorting.ByExecutor:
//                 // console.debug(`${pathVisibleSorting} - doSorting: ByExecutors`);

//                 propToFind = 'executors';
//                 //TODO-advanced: переписать, дичь дичайщая вместе с Array.sort 
//                 // Для эффективности придется сказать "Привет. Просто здрасте. Просто как дела ?"
//                 // алгоритмам поиска и сортировки
//                 testProp = function(taskExecutors) {
//                     for(let executor in taskExecutors) {
//                         if(executor.id === doSorting.value) return true;
//                     }
//                     return false;
//                 };
//                 break;
//             case ESorting.ByPriority:
//                 // console.debug(`${pathVisibleSorting} - doSorting: ByPriority`);

//                 propToFind = 'priority';
//                 testProp = function(taskPriority) {
//                     return taskPriority === doSorting.value;
//                 };
//                 break;
//             case ESorting.ByStatus:
//                 // console.debug(`${pathVisibleSorting} - doSorting: ByStatus`);

//                 propToFind = 'status';
//                 testProp = function(taskStatus) {
//                     return taskStatus === doSorting.value;
//                 };
//                 break;
//             default: 
//                 console.error(`Err: unknow ESorting type (type: ${doSorting.type})`);
//                 return tasks;
//         }

//         return tasks.sort((a, b) => {
//             return testProp(b[propToFind]) - testProp(a[propToFind]);
//         });
//     }
// );

// const pathVisibleTaskList = 'select Reverse:';
// let reverseDone = false;
// export const getVisibleTaskList = createSelector(
//     [getCurrentReverse, getVisibleSorting, getCurrentTasks],
//     (doReverse, tasksAfterSorting, defaultTasks) => {
//     //    console.debug(enter);
//         reverseDone = true;
            
//         let tasks = (sortingDone) ? tasksAfterSorting : defaultTasks;
//         console.debug(`${pathVisibleSorting} tasks: `, tasks);

//         console.debug(`${pathVisibleTaskList} doReverse: ${doReverse}`);
//         let tmp = [...tasks];
//         console.debug(`${pathVisibleTaskList} tasks: `, tmp);
//         // tmp.reverse();
//         // console.debug(`${pathVisibleTaskList} after Reverce tasks: `, tmp);
//         console.debug(enter);
       
//         (doReverse) && tasks.reverse();

//         clearHelpVars();
//         return tasks;
//     }
// );

// function clearHelpVars() {
//     findDone = false;
//     filterDone = false;
//     sortingDone = false;
//     reverseDone = false;
// }

// TODO-advanced: сделать Memo
// const pathChanges = '.testChanges() -';
// let initialized = false;
// function initTestChanges(filter) {
    //     let previosFilter = {...filter};
    //     initialized = true;
    //     console.debug(`${pathChanges} initialized`);
    //     return (activeFilter) => {
        
        //     };
        // };
        
        // let testChanges; 
        
// const enter = "-------------"; // debug
export function getTaskList(state) {
    let { tasks, activeFilter } = state;
    // if(!initialized) testChanges = initTestChanges(activeFilter);

    // let changes = testChanges(); 
    // let afterDo; 
    
    // switch() {

    // }
    // console.debug(`.getTaskList() - tasks before changes: `, tasks);
    // console.debug(enter);
    let toPrepareTask = [...tasks];

    let afterFind = doFind(activeFilter.toFind, toPrepareTask);
    // console.debug(`.getTaskList() - tasks after Find: `, afterFind);
    // console.debug(enter);

    let afterFilter = doFilter(activeFilter.filter, afterFind);
    // console.debug(`.getTaskList() - tasks after Filter: `, afterFilter);
    // console.debug(enter);

    let afterSorting = doSorting(activeFilter.sorting, afterFilter);
    // console.debug(`.getTaskList() - tasks after Sorting: `, afterSorting);
    // console.debug(enter);

    let afterReverse = doReverse(activeFilter.reverse, afterSorting);
    // console.debug(`.getTaskList() - tasks after Reverse: `, afterReverse);
    // console.debug(enter);

    return afterReverse;
}

const pathFind = '.doFind() -';
function doFind(find, tasks) {
    if(find.localeCompare('') === 0){
        console.debug(`${pathFind} empty find`);
        return tasks;  
    } 

    let founds = tasks.filter((task) => {
        return task.title.indexOf(find) !== -1;
    });
    if(founds.length > 0) {
        // console.debug(`${pathFind} founds`, founds);
        return founds;
    }

    console.debug(`${pathFind} founds does't exist`, founds);
    return tasks;
}

let pathFilter = '.doFilter() -';
function doFilter(filter, tasks) {
    let propToFind;
    let testProp;
    switch(filter.type) {
        case EFilter.None: 
            // console.debug(`${pathFilter} filter: None`);
            return tasks;
        case EFilter.ByExecutor:
            // console.debug(`${pathFilter} filter: ByExecutors, , value: ${filter.value}`);

            propToFind = 'executors'; 
            testProp = function(taskExecutors) {
                for(let executor in taskExecutors) {
                    if(executor.id === filter.value) return true;
                }
                return false;
            };
            break;
        case EFilter.ByPriority:
            // console.debug(`${pathFilter} filter: ByPriority, value: ${filter.value}`);

            propToFind = 'priority';
            testProp = function(taskPriority) {
                return taskPriority === filter.value;
            };
            break;
        case EFilter.ByStatus:
            // console.debug(`${pathFilter} filter: ByStatus, value: ${filter.value}`);

            propToFind = 'status';
            testProp = function(taskStatus) {
                return taskStatus === filter.value;
            };
            break;
        default: 
            console.error(`${pathFilter} Err: unknow EFilter type (type: ${filter.type})`);
            return tasks;
    }

    return tasks.filter((task) => {
        return testProp(task[propToFind]);
    });
}

let pathSorting = '.doSorting() -';
function doSorting(sorting, tasks) {
    let propToFind;
    let testProp;

    switch(sorting.type) {
        case ESorting.None:
            // console.debug(`${pathSorting} sorting: None`); 
            return tasks;
        case ESorting.ByExecutor:
            // console.debug(`${pathSorting} sorting: ByExecutors, value: ${sorting.value}`);

            propToFind = 'executors';
            //TODO-advanced: переписать, дичь дичайщая вместе с Array.sort 
            // Для эффективности придется сказать "Привет. Просто здрасте. Просто как дела ?"
            // алгоритмам поиска и сортировки
            testProp = function(taskExecutors) {
                for(let executor in taskExecutors) {
                    if(executor.id === sorting.value) return true;
                }
                return false;
            };
            break;
        case ESorting.ByPriority:
            // console.debug(`${pathSorting} sorting: ByPriority, value: ${sorting.value}`);

            propToFind = 'priority';
            testProp = function(taskPriority) {
                return taskPriority === sorting.value;
            };
            break;
        case ESorting.ByStatus:
            // console.debug(`${pathSorting} sorting: ByStatus, value: ${sorting.value}`);

            propToFind = 'status';
            testProp = function(taskStatus) {
                return taskStatus === sorting.value;
            };
            break;
        default: 
            console.error(`${pathSorting} Err: unknow ESorting type (type: ${sorting.type})`);
            return tasks;
    }

    return tasks.sort((a, b) => {
        return testProp(b[propToFind]) - testProp(a[propToFind]);
    });
} 

// doc {
        // let newTasks = [...tasks];

    // при false - какого-то **ра происходит мутация, но работает  
        // return (reverse) ? newTasks.reverse() : newTasks;

    // при false - мутируем, но работает
        // return (reverse) ? newTasks.reverse() : tasks;

    // при true - мутируем, но работает для true
        // return (reverse) ? tasks.reverse() : newTasks; 

    // так или иначе мутируем, не работает 
    // так как мутировали, перерендера не произошло 
        // return (reverse) ? tasks.reverse() : tasks; 
// }

// let pathReverse = '.doReverse() -'; 
function doReverse(reverse, tasks) {
    // console.debug(`${pathReverse} reverse: ${reverse}`);

    // let newTasks = [...tasks];
    // return (reverse) ? newTasks.reverse() : newTasks;
    return (reverse) ? tasks.reverse() : tasks;
}