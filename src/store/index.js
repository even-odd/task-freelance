import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { rootReduser } from '../redusers/index';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReduser);

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
};

// export default createStore(rootReduser);

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