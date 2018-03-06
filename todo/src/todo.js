import React, {Component} from 'react';
import TodoCreate from './todo-create';
import TodoList from './todo-list';
import TodoFilter from './todo-filter';

class Todo extends Component {
    constructor() {
        super();
        this.state = {
            todoList: [{
                text: "test123",
                id: 1,
                status: false
            }]
        }
    }

    addTodo(text) {

        var todoItem = {
            text: text,
            id: this.state.todoList.length,
            status: false
        };

        this.setState({
            todoList: this.state.todoList.push(todoItem)
        });
    }

    updateTodo(updatedTodoItem) {
        var updatedTodoList = this.state.todoList.map(todoItem => {
            if(todoItem.id === updatedTodoItem.id) {
                todoItem.status = true;
            }
            return todoItem;
        });
        this.setState({
            todoList: updatedTodoList
        });
    }

    render() {
        return (
            <div>
                {/* <TodoCreate addTodo={this.addTodo(text).bind(this)} /> */}
                <TodoCreate />
                <TodoList todoList={this.state.todoList} />
                {/* <TodoFilter todoList={this.state.todoList} updateTodo={this.updateTodo(todoItem).bind(this)} /> */}
                <TodoFilter todoList={this.state.todoList} />
            </div>
        );
    }
}

export default Todo;