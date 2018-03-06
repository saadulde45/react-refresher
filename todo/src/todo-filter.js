import React, {Component} from 'react';

class TodoFilter extends Component {
    render() {
        return (
            <div>
                <span>Count : </span>
                <span>All</span>
                <span>Active</span>
                <span>Completed</span>
            </div>
        );
    }
}

export default TodoFilter;