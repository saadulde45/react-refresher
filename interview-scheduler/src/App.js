import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import CandidateTable from './candidate-table';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);

    const columnFormatter = (cell, rowData, rowIdx, extraFormatData) => {

      if (extraFormatData.columnType === "testDetails") {
        if (rowData.testDetails.score < 3) {
          return "Rejected";
        } else {
          return "Selected";
        }
      }

      if (extraFormatData.columnType === "l1Details") {
        switch (extraFormatData.columnField) {
          case "score":
            if (rowData.testDetails.score >= 3) {
              if (rowData.l1Details.score !== null) {
                return rowData.l1Details.score;
              } else {
                return (
                  <button>Schedule L1</button>
                );
              }
            } else {
              return "NA";
            }
          case "status":
            if (rowData.l1Details.score !== null) {

              if (rowData.l1Details.score >= 3) {

                var start = new moment(rowData.l1Details.startTime);
                var end = new moment();

                if (rowData.l1Details.endTime !== null && rowData.l1Details.endTime.length !== 0) {
                  end = new moment(rowData.l1Details.endTime);
                }
                var duration = moment.duration(end.diff(start));

                return (
                  <span>
                    Selected {duration.asMinutes()} mins
                  </span>
                );
              } else {
                return "Rejected";
              }
            } else {
              return "NA";
            }
          default: break;
        }

      }
    };

    const testValidator = (newValue, row, column) => {
      var dataField = column.dataField.split('.');
      var oldData = row[dataField[0]][dataField[1]];
      
      if (newValue < oldData) {
        return {
          valid: false,
          message: 'The value should be between 1-5'
        }
      }
      return true;
    };

    this.columns = [{
      dataField: 'name',
      text: 'Name',
      editable: false
    }, {
      dataField: 'experience',
      text: 'Experience',
      editable: false
    }, {
      dataField: 'testDetails.score',
      text: 'Test Score',
      validator: testValidator,
      editCellClasses: (cell, row, rowIndex, colIndex) => {
        return (cell < 1 || cell > 5)  ? 'has-error' : 'has-success';
      }
    }, {
      dataField: 'testDetails.startTime',
      text: 'Test Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.testDetails.score > 3;
      },
      formatter: columnFormatter,
      formatExtraData: {
        "columnType": "testDetails",
        "columnField": "status"
      }
    }, {
      dataField: 'l1Details.score',
      text: 'L1 Score',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.testDetails.score > 3;
      },
      formatter: columnFormatter,
      formatExtraData: {
        "columnType": "l1Details",
        "columnField": "score"
      }
    }, {
      dataField: 'l1Details.startTime',
      text: 'L1 Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.l1Details.score !== "NA" && row.l1Details.score > 3;
      },
      formatter: columnFormatter,
      formatExtraData: {
        "columnType": "l1Details",
        "columnField": "status"
      }
    }, {
      dataField: 'gkDetails.score',
      text: 'GK Score',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.l1Details.score !== "NA" && row.l1Details.score > 3;
      },
      formatter: columnFormatter,
      formatExtraData: {
        "columnType": "gkDetails",
        "columnField": "score"
      }
    }, {
      dataField: 'gkDetails.startTime',
      text: 'GK Status',
      editable: (content, row, rowIndex, columnIndex) => {
        return row.gkDetails.score !== "NA" && row.gkDetails.score > 3;
      },
      formatter: columnFormatter,
      formatExtraData: {
        "columnType": "gkDetails",
        "columnField": "status"
      }
    }];

    this.state = {
      data: [],
      loading: true
    };

    setTimeout(() => {
    this.setState({
      data: this.props.users,
      loading: false
    });
    }, 2000);


  }

  render() {
    return (
      <div>
        <CandidateTable
          columns={this.columns}
          data={this.state.data}
          keyField='emailId'
          loading={this.state.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return { users: store.users }
}

export default connect(mapStateToProps)(App);
