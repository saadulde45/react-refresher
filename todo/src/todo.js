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
                console.log("in", item.status, this.state.selectedFilter);
                if(item.status === this.state.selectedFilter) {
                    return item;
                }
            });
        }

        console.log("check", this.state.selectedFilter, updatedTodoList, updatedFilteredList);

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
            selectedFilter: true
        });

        console.log("filter setting", this.state, filter);

        this.updateFilteredList(this.state.todoList);
    } 

    render() {
        return (
            <div>
                <TodoCreate addTodo={this.addTodo.bind(this)} />
                <TodoList todoList={this.state.todoList} updateTodo={this.updateTodo.bind(this)} />
                <TodoFilter todoList={this.state.todoList} updateFilter={this.updateFilter.bind(this)}/>
            </div>
        );
    }
}

export default Todo;