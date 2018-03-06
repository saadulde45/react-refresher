import React, {Component} from 'react';

class TodoCreate extends Component {

    addTodo(event) {
        if(event.key === 'Enter') {
            this.props.addTodo(event.target.value);
        }
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="What needs to be done?" onKeyPress={this.addTodo.bind(this)} />
            </div>
        );
    }
};

export default TodoCreate;