import React, {Component} from 'react';

const TodoFilter = (props) => {
    return (
        <div>
            <span>Count : {props.todoList.length}</span>
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
        </div>
    );
}

export default TodoFilter;