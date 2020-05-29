import { EPriority, EStatus } from "./consts/enums";

// Позволяет получить css-класс и заголовок свойства
// * propName - название свойства. Примеры: "priority", "status" ...
// * propValue - значение свойства. Пример: "EStatus.Done"
// ПО ПОРЯДКУ ДОЛЖНЫ СООТВЕСТВОВАТЬ ENUM:
//  * propTitles - заголовки для выбора. Пример: ['wish', 'low', ...] 
//  * propClases - классы для выбора. Пример: ['wish', 'low', ...] 
export function getProperty(propName, propValue, propTitles, propClasses) {
    let locEnum;
    let locPropName = propName.toLocaleLowerCase();
    let result = {
        title: '',
        class: ''
    };

    if(!propClasses) {
        propClasses = propTitles;
    }

    switch(locPropName) {
        case 'priority':
            locEnum = EPriority;
            console.debug('Enum: Priority');// debug
            break;
        case 'status':
            locEnum = EStatus;
            console.debug('Enum: Status');// debug
            break;
        default: 
            let err = `Err: utils.getProperty - Unknown Enum (enum: ${propName})`;
            console.error(err);

            return {error: true, msg: err};
    }

    let enumKeys = Object.keys(locEnum);
    
    printArrValues(enumKeys);// debug

    for(let i = 0; i < enumKeys.length; i++) {
        if(enumKeys[i].localeCompare(propValue) === 0) {
            console.debug(`Property: ${propValue},
                            Title: ${propTitles[i]},
                            Class: ${propClasses[i]}`);// debug
            result.title = propTitles[i];
            result.class = propClasses[i];
            return result;
        }
    }

    let err = `Err: Unknown ${propName} (${propName}: ${propValue})`;
    console.error(err);
    return {error: true, msg: err};
}

// debug function
export function printArrValues(arr) {
    console.debug('PRINT ARR VALUES - begin');
    for(let i = 0; i < arr.length; i++) {
        console.log(`VALUE: ${arr[i]}`);
    }
    console.debug('PRINT ARR VALUES - end');
}