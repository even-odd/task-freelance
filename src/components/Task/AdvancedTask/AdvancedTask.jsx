import React, { Component } from "react";
import { connect } from 'react-redux';

import './AdvancedTask.css';
import { getFreeId, getUpdatedTaskList } from "../../../utils";
import { taskTypeActions } from "../../../consts/actionTypes";

import SimpleTask from "../SimpleTask/SimpleTask";

// Выводит расширенную информацию о задачи по типу Jira
// props:
//  task - у AdvancedTask всегда должен быть родитель
class AdvancedTask extends Component {
    constructor(props) {
        super(props);
   
        this.state = {  
            adTask: {
                id: props.task.id,
                title: props.task.title,
                // немного убого, но лишь немного
                description: (props.task.description.length > 1) 
                    ? props.task.description 
                    : 'Напишите здесь свое описание...',
                taskList: props.task.taskList
            },
            saved: true
        };
    }

    // для обновления 
    static getDerivedStateFromProps(nextProps, prevState) {
        console.debug('AdvancedTask.getDerivedStateFromProps');
        let res = null;
        if (prevState.adTask.id !== nextProps.task.id) res = {
            adTask: {
                id: nextProps.task.id,
                title: nextProps.task.title,
                description: (nextProps.task.description.length > 1) 
                    ? nextProps.task.description 
                    : 'Напишите здесь свое описание...',
                taskList: nextProps.task.taskList
            },
            saved: true
        }; 
        
        return res;
    }

    render() {
        let { adTask, saved} = this.state;

        // console.debug('AdvancedTask.render - state:', this.state);
        return (
           <div className='ad-task'>
                <div className="ad-task__box">
                    <div className="ad-task__title">
                        { adTask.title }
                    </div>
                    { !saved &&
                    <button className="ad-task__btn-save" onClick={ this.saveChanges }>
                        Сохранить изменения
                    </button>
                    }
                </div>
                
                <div className="ad-task__description" onDoubleClick={ this.handleEdit }>
                    { (saved) 
                    ? adTask.description
                    : <textarea defaultValue={ adTask.description }
                                onBlur={ (e) => this.changeProp('description', e.target.value) }/> 
                    }
                </div>
                
                <div className='ad-task__task-list'>
                { 
                    adTask.taskList.map((simpleTask) => 
                        <SimpleTask parentId={ adTask.id } 
                                    task={ simpleTask } key={ simpleTask.id } 
                                    saveTask={(newTask) => this.changeProp('taskList', getUpdatedTaskList(adTask.taskList, newTask))}
                                    deleteTask={() => this.delSimpleTask(simpleTask.id) }/>
                    )
                }
                    <button className='ad-task__btn-add-simple' onClick={ this.addNewSimpleTask }>
                        <span role='img' aria-label='add simple task'>➕</span>
                    </button>
                </div>
           </div> 
        );
    }

    // Тогглер для переключения в режим редактирования    
    handleEdit = (event) => {
        this.setState({
            saved: false
        });
        event.stopPropagation()
    }

    // Обновляет значение задачи
    changeProp = (prop, newValue) => {        
        console.debug(`AdvancedTask.changeProp - ${prop}: `, newValue);
        this.setState((prevState) => {
            return { 
                adTask: {
                    ...prevState.adTask,
                    [prop]: newValue 
                },
                saved: false
            }
        });
    }

    // Сохраняет измения в redux store 
    saveChanges = () => {
        console.debug(`AdvancedTask.saveChanges`);
        this.setState({saved: true});
        this.props.saveTask(this.state.adTask);
    }

    // Добавить подзадачу
    addNewSimpleTask = () => {
        let { taskList } = this.state.adTask; 
        let taskIds = taskList.map((task) => task.id);
        let newId = getFreeId(taskIds);
        
        this.changeProp('taskList', [...taskList, {id: newId}]);
    }
    
    // Удалить подзадачу по Id
    delSimpleTask = (delId) => {
        let { taskList } = this.state.adTask; 
        let newTaskList = taskList.filter((smTask) => {
            if(smTask.id !== delId) return true;
            return false;
        });

        this.changeProp('taskList', newTaskList);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTask: (task) => {
            dispatch({ type: taskTypeActions.SAVE_TASK, task });
        }
    }
};

export default connect(null, mapDispatchToProps)(AdvancedTask);