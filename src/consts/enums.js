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
    ByExecutor: 2,
    ByStatus: 3
};
export const propsSorting = toProps(['by priority', 'by executor', 'by status'], 1)

export const EFilter = {
    None: 0,
    ByPriority: 1,
    ByExecutor: 2,
    ByStatus: 3,
    ByUnSavedTask: 4 // TODO-advanced 
};
export const propsFilter = toProps(['by priority', 'by executor', 'by status'], 1)

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
    Status: 0,
    Priority: 1,
    Filter: 2,
    Sorting: 3
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
