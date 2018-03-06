import React from 'react';
import './App.css';

const TodoList = (props) => {

    return (
        <ul>
            {
                props.todoList.map(item => {
                    return (
                        <li key={item.id} onClick={() => {props.updateTodo(item)}}>
                            <input type="checkbox" checked={item.status} /> 
                            <span className={ item.status ? "completed" : ""} > {item.text} </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default TodoList;