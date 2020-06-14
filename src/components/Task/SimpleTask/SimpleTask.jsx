import React, { Component } from "react";

import './SimpleTask.css';
import { numberTest } from "../../../utils";

// Служит для ображения подзадачи
// TODO-advanced: Можно будет создать задачу отображаемую в основном списке
// props:
//  taskId - по id задача будет получать для себя данные

// Notice: можем определять id отложено(в reducer) и ограничиться здесь лишь генерируемым
class SimpleTask extends Component {
    constructor(props) {
        super(props);

        let testCreate = props.task.title !== undefined; 
        this.state = {
            smTask: (testCreate) ? props.task : this.createNewTask(),
            saved: true
        };
    }

    render() {
        let { smTask, saved } = this.state; 
        return (
           <div className='sl-task'>
                <input type="checkbox" 
                    defaultChecked={smTask.status} onClick={() => this.changeProp('status', !smTask.status)}/>

                { (saved) 
                    ? <div className="sl-task__title" onDoubleClick={ this.handleEdit }>
                        { smTask.title }
                    </div>
                    : <input type='text' defaultValue={ smTask.title }
                             className='sl-task_input-title' 
                             onBlur={(e) => this.changeProp('title', e.target.value)}/>
                }
                <button onClick={ this.props.deleteTask }>X</button>
           </div>
        );
    }

    // Notice: удаление происходит с помощью родителя по клику
    // Сразу передаем родителю на сохранение
    createNewTask = () => {
        let newId = this.props.task.id;
        numberTest('newId', newId, 'SimpleTask.createNewTask', true);
        let newTask = {
            id: newId,
            title: 'Write you task title here...',
            status: false, // TODO-advanced: сделать нормальные статусы с изменением
        };

        this.props.saveTask(newTask);
        return newTask;
    }
    
    // Тогглер для переключения в режим редактирования    
    handleEdit = () => {
        this.setState({
            saved: false
        });
    }

    // Обновляет значение задачи и обновляет его в родителе
    changeProp = (prop, newValue) => {
        this.setState((prevState) => {
            return {
                smTask: {
                    ...prevState.smTask,
                    [prop]: newValue
                },
                saved: true
            }
        });
        this.props.saveTask({...this.state.smTask, [prop]: newValue});
    }
}

export default SimpleTask;