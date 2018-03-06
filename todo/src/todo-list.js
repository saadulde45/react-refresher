import React, {Component} from 'react';

const TodoList = (props) => {
    console.log(props);
    return (
        <div>
            <ul>
                {
                    props.todoList.map(item => {
                        return <li key={item.id}> {item.text} </li>;
                    })
                }
            </ul>
        </div>
    );
}

export default TodoList;