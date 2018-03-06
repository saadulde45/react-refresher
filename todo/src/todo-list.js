import React from 'react';

const TodoList = (props) => {

    return (
        <ul>
            {
                props.todoList.map(item => {
                    return (
                        <li key={item.id} onClick={() => {props.updateTodo(item)}}>
                            <input type="checkbox" checked={item.status} /> 
                            <span> {item.text} </span>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default TodoList;