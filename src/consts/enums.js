export const EProgressBar = {
    TimeLimit: 0,
    CompletedTasks: 1
};

export const EStatus = {
    Done: 0,
    Await: 1,
    Delaye: 2,
    During: 3
};
export const propsStatus = toProps(Object.keys(EStatus));

export const EPriority = {
    Wish: 0,  // хотелка
    Low: 1, 
    Medium: 2,
    Important: 3,
    Critical: 4   
};
export const propsPriority = toProps(Object.keys(EPriority));

export const ESorting = {
    None: 0,
    ByPriority: 1,
    ByExecutor: 2, // TODO-advanced 
    ByStatus: 3,
    ByUnSavedTask: 4 // TODO-advanced 
};
export const propsSorting = toProps(['none', 'by priority', 'by executor', 'by status']);

export const EFilter = {
    None: 0,
    ByPriority: 1,
    ByExecutor: 2, // TODO-advanced 
    ByStatus: 3,
    ByUnSavedTask: 4 // TODO-advanced 
};
export const propsFilter = toProps(['none', 'by priority', 'by executor', 'by status']);

// используется только для доступа (что бы не переписывать при изменениях)
export const EFilterProp = {
    Reverse: 'reverse', 
    Sorting: 'sorting', 
    Filter: 'filter', 
    ToFind: 'toFind' 
};

export const EVector = {
    Left: 0,
    Right: 1
};

export const ETaskType = {
    Simple: 0,
    Full: 1
};

export const EPerson = {
    Executor: 0,
    Owner: 1
};

export const EToRender = {
    AdvancedTask: 0
};

export const ESelectType = {
    None: 0,
    Status: 1,
    Priority: 2,
    Filter: 3,
    Sorting: 4,
    Executor: 5
};
export const propsSelect = toProps(Object.keys(ESelectType));

function toProps(arr, beginIndex = 0) {
    return arr.map((prop) => {
        if (beginIndex > arr.length) console.warn('Warn: toProps() - strange beginIndex'); 
        return {
            title: prop.toLocaleLowerCase(),
            value: beginIndex++ // значение в перечислении исключая None
        };
    });
}
