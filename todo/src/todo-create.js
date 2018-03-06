import React, {Component} from 'react';

const TodoCreate = (props) => {

    const addTodo = (event) => {
        if(event.key === 'Enter') {
            props.addTodo(event.target.value);
        }
    };
    
    return (
        <div>
            <input className="addTodo" type="text" placeholder="What needs to be done?" onKeyPress={addTodo} />
        </div>
    );
};

export default TodoCreate;