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
            // console.debug('Enum: Priority');// debug
            break;
        case 'status':
            locEnum = EStatus;
            // console.debug('Enum: Status');// debug
            break;
        default: 
            let err = `Err: utils.getProperty - Unknown Enum (enum: ${propName})`;
            console.error(err);

            return {error: true, msg: err};
    }

    let enumKeys = Object.keys(locEnum);

    for(let i = 0; i < enumKeys.length; i++) {
        if(locEnum[enumKeys[i]] === propValue) {
            // console.debug(`Property: ${propValue},\nTitle: ${propTitles[i]},\nClass: ${propClasses[i]}`);// debug
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
        for(let prop in obj) 
            console.log(`Prop: ${prop}, Value: ${obj[prop]}`);
    console.debug('PRINT OBJ VALUES - end');
}


// Делает проверку числового параметра
// return: true - проверка пройдена
//         fasle - проверка НЕ пройдена  
export function numberTest(name, value, from, throwErr = false) {
    let msg;
    let hasErr = false;

    if(!value && value !== 0) {
        hasErr = true;
        msg = `Err: ${from} - ${name} does't exist`;
    } else if(value <= -1) {
        hasErr = true;
        msg = `Err: ${from} - invalid ${name}`;
    }

    throwOrPrint(msg, hasErr, throwErr);

    return true;
}

// Делает проверку массива
// return: true - проверка пройдена
//         fasle - проверка НЕ пройдена 
export function arrTest(name, arr, from, throwErr = false) {
    let msg;
    let hasErr = false;

    if(arr === undefined) {
        hasErr = true;
        msg = `Err: ${from} - ${name} does't exist`;
    } else if(arr.length <= 0) {
        msg = `Warn: ${from} - ${name} is empty`;
    }

    throwOrPrint(msg, hasErr, throwErr);

    return true;
}

function throwOrPrint(msg, hasErr, throwErr) {
    if (hasErr && throwErr) {
        throw new Error(msg);
    } else if(hasErr){
        console.error(msg);
        return false;
    }
}

// Миллесекунды в дни
export function getDays(milliseconds) {
    // msInSec / secInMin / minInHour / hourInDay 
    return Math.floor(milliseconds / 1000 / 60 / 60 / 24);
}

const TEN_DAYS = 10 * 24 * 60 * 60 * 1000; 
export function getTenDays(currTime) {  
    return currTime + TEN_DAYS;
}

// Вычислет свободный id
// args: arrId - массив занятых id
export function getFreeId(arrId) {
    let lastId = (arrId.length > 0) ? arrId[arrId.length - 1] : 0;
    let count = 0;

    if(arrId[arrId.length - 1] && lastId === 0) {
        // console.debug(`     .getFreeId() - newId: ${lastId}`);
        return lastId;
    }

    while(true) {
        if(arrId.includes(lastId + count)) {
            count++ 
        } else {
            // console.debug(`     .getFreeId() - newId: ${lastId + count}`);
            return lastId + count;
        }
    }
}

// Date в удобочиемый вид
export function getStrDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

// Str в Date
export function parseStrToDate(strToDate) {
    let match = strToDate.match(/(\d?\d)-(\d?\d)-(\d{4})/);
    
    let parsed = new Date();
    parsed.setDate(+match[1]);
    parsed.setMonth(match[2] - 1);
    parsed.setFullYear(+match[3]);

    return parsed;
}

// Делает валидацию и подготавливает значение к изменению 
export function prepareChangedProp(prop, rawValue) {
    console.debug('prepareChangedProp() - prop:', prop);
    let validated = {hasErr: false, trueFormat: 'default format'};
    let doPrepare; 
    let prepared = {
        value: '',
        err: false
    };

    switch(prop) {
        // для строковых значений - никаких изменений
        case 'title':
            // validated = validateTaskTitle(rawValue, state);
            doPrepare = () => rawValue;
            break;
        case 'timeBegin':
        case 'timeEnd':
            validated = validateTime(rawValue);
            doPrepare = () => parseStrToDate(rawValue);
            break;
        // для числовых значений - приводим к числу
        default: 
            doPrepare = () => +rawValue;
    }

    if(validated.hasErr) {
        prepared.value = `Invalid ${prop} format, use - ${validated.trueFormat}`;
        prepared.err = true;
    } else {
        prepared.value = doPrepare();
    }

    return prepared;
}

// Делает валидацию времени
export function validateTime(time) {
    let validated = {
        hasErr: false,
        trueFormat: /\d+-\d+-\d{4}/
    };

    if(!validated.trueFormat.test(time)) validated.hasErr = true;

    return validated;
}

export function getUpdatedTaskList(oldList, changedTask) {
    let found = false;
    let newList = oldList.map(task => {
        if(task.id === changedTask.id) {
            found = true;
            let editedTask = {...task, ...changedTask};
            return editedTask;
        }
        return task;
    });
    
    (found) 
    ? console.debug('task.reduser - EDITED: ', newList)
    : console.debug('task.reduser - ADDED: ', [...oldList, changedTask]);
    return (found) ? newList : [...oldList, changedTask];
}