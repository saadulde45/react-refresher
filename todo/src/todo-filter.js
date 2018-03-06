import React, {Component} from 'react';

const TodoFilter = (props) => {

    return (
        <div>
            <span>Count : {props.todoList.length} items left</span>
            <span onClick={() => {
                props.updateFilter(null)
            }} >All</span>
            <span onClick={() => {
                props.updateFilter(false)
            }} >Active</span>
            <span onClick={() => {
                props.updateFilter(true)
            }} >Completed</span>
        </div>
    );

}

export default TodoFilter;