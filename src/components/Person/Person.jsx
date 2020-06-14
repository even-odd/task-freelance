import React from "react";

// props: 
//  person 

const DEFAULT_PERSON = {
    name: 'Name',
    secondName: 'SecondName',
    icon: ''
}

function Person (props) {
    let { person } = props;
    person = (person) ? person : DEFAULT_PERSON;

    let fullName = `${person.name} ${person.secondName}`;
    return (
        <div className='executor'>
            {/* <a href={}> */}
                <img className="person__icon" src={ person.icon } alt='Person icon'/>
                <span className="person__name">{ fullName }</span> 
            {/* </a> */}
        </div>
    );
}

export default Person;

// TODO: сделать представление в данных

// executor: {
//  icon - иконка исполнителя
//  name 
//  secondName
//  TODO: спросить: нужно ли делать ссылку ? Можно ли как-то более элегантно перейти на профиль исполнителя 
//  link  
// }