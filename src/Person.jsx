import React from "react";

// props: 
//  person 

function Person (props) {
    let { person } = props;
    let fullName = person.name + person.secondName;
    return (
        <div className='executor'>
            {/* <a href={}> */}
                <img className="person__icon" src={ person.icon }/>
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