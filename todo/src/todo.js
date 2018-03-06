import React, {Component} from 'react';
import TodoCreate from './todo-create';
import TodoList from './todo-list';
import TodoFilter from './todo-filter';

class Todo extends Component {
    constructor() {
        super();
        this.state = {
            todoList: [],
            selectedFilter: null,
            filteredList: []
        }
    }

    updateFilteredList(updatedTodoList) {
        
        var updatedFilteredList = [];
        
        if(this.state.selectedFilter === null) {
            updatedFilteredList = updatedTodoList;
        } else {
            updatedFilteredList = updatedTodoList.filter(item => {
                if(item.status === this.state.selectedFilter) {
                    return item;
                }
            });
        }

        this.setState({
            todoList: updatedTodoList,
            filteredList: updatedFilteredList
        });

    }

    addTodo(text) {
        
        var todoItem = {
            text: text,
            id: this.state.todoList.length,
            status: false
        };

        this.state.todoList.push(todoItem);
        this.updateFilteredList(this.state.todoList);
    }

    updateTodo(updatedTodoItem) {

        var updatedTodoList = this.state.todoList.map(todoItem => {
            if(todoItem.id === updatedTodoItem.id) {
                todoItem.status = true;
            }
            return todoItem;
        });

        this.updateFilteredList(updatedTodoList);
    }

    updateFilter(filter) {

        this.setState({
            selectedFilter: filter
        }, () => {
            this.updateFilteredList(this.state.todoList);
        });
    } 

    // Caused a recursive loop
    // componentDidUpdate(previousState, nextState) {
    //     this.updateFilteredList(this.state.todoList);
    // }

    render() {
        return (
            <div>
                <TodoCreate addTodo={this.addTodo.bind(this)} />
                <TodoList todoList={this.state.filteredList} updateTodo={this.updateTodo.bind(this)} />
                <TodoFilter todoList={this.state.filteredList} updateFilter={this.updateFilter.bind(this)}/>
            </div>
        );
    }
}

export default Todo;