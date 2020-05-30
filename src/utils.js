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
        console.log(`Value: ${arr[i]}`);
    }
    console.debug('PRINT ARR VALUES - end');
}

// debug function
export function printObjValues(obj) {
    console.debug('PRINT OBJ VALUES - begin');
    let keys = Object.keys(obj);

    for(let i = 0; i < keys.length; i++) {
        console.log(`Key: ${keys[i]}, Value: ${obj[keys[i]]}`);
    }
    console.debug('PRINT OBJ VALUES - end');
}


// Делает проверку числового параметра
// return: true - проверка пройдена
//         fasle - проверка НЕ пройдена  
export function numberTest(name, value, from, throwErr = false) {
    let msg;
    let hasErr = false;

    if(!value) {
        msg = `Err: ${from} - ${name} does't exist`;
    } else if(value <= -1) {
        msg = `Err: ${from} - invalid ${name}`;
    }

    if (hasErr && throwErr) {
        throw new Error(msg);
    } else if(hasErr){
        console.error(msg);
        return false;
    } 

    return true;
}

export function getDays(milliseconds) {
    // msInSec / secInMin / minInHour / hourInDay 
    return Math.floor(milliseconds / 1000 / 60 / 60 / 24);
}