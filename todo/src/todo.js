import React, {Component} from 'react';
import TodoCreate from './todo-create';
import TodoList from './todo-list';
import TodoFilter from './todo-filter';

class Todo extends Component {
    render() {
        return (
            <div>
                <TodoCreate />
                <TodoList /> 
                <TodoFilter />
            </div>
        );
    }
}

export default Todo;