import { createStore } from 'redux';

import { appRedusers as redusers } from '../redusers/index';

export const appStore = createStore(redusers);

// data structure 

// const initialAppState = {
//     tasks: [     // store task 
//         {         // task instance  
//             id: numberInString,
//             taskType: ETaskType,
//             title: string,
//             status: EStatus,
//             priority: EPriority,
//             executors: [], // array string executorId, using to view in Task 
//             timeBegin: Date,
//             timeEnd:  Date
//         }
//     ],
//     activeFilter: {
//         filter: EFilter,
//         sort: ESort,
//         reverse: boolean,
//         toFind: string // simple finding by task title
//     },
//     toRender: EToRender 
//     groups: {
//         id: {
//             id: numberInString,
//             name: string,
//             members: [] // person id list 
//         }
//     },
//     persons: {
//         id: {
//             id: numberInString,
//             type: EPerson,
//             name: string,
//             secondName: string,
//             registrationDate: Date,
//             photo: , // ~(*-*)~
//             about: string,
//             contacts: {
//                 mail: string,
//                 tel: string
//             }
//         }
//     } 
// };