import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import CandidateTable from './candidate-table';

class App extends Component {

  constructor(props) {
    super(props)

    this.columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'experience',
      text: 'Experience'
    }, {
      dataField: 'testDetails.score',
      text: 'Test Score'
    }, {
      dataField: 'testDetails.startTime',
      text: 'Test Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.testDetails.score > 3;
      }
    }, {
      dataField: 'l1Details.score',
      text: 'L1 Score',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.testDetails.score > 3;
      }
    }, {
      dataField: 'l1Details.startTime',
      text: 'L1 Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.l1Details.score !== "NA" && row.l1Details.score > 3;
      }
    }, {
      dataField: 'gkDetails.score',
      text: 'GK Score',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.l1Details.score !== "NA" && row.l1Details.score > 3;
      }
    }, {
      dataField: 'gkDetails.startTime',
      text: 'GK Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.gkDetails.score !== "NA" && row.gkDetails.score > 3;
      }
    }];

    this.state = {
      data: this.props.users || []
    }
  }

  render() {
    return (
      <div>
        <CandidateTable
          columns={this.columns}
          data={this.state.data}
          keyField='emailId'
        />
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return { users: store.users }
}

export default connect(mapStateToProps)(App);
