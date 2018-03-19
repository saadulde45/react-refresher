import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import MockData from './mock-data.json';
import moment from 'moment';

class CandidateTable extends Component {

    render() {

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
                        if (rowData.testDetails.score >= 3 && rowData.l1Details.score !== null) {
                            
                            if (rowData.l1Details.score >= 3) {

                                var start = new moment(rowData.l1Details.startTime);
                                var end = new moment();

                                if(rowData.l1Details.endTime !== null && rowData.l1Details.endTime.length !== 0) {
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
    
            if (extraFormatData.columnType === "gkDetails") {
                switch (extraFormatData.columnField) {
                    case "score":
                        if (rowData.testDetails.score >= 3 && rowData.l1Details.score >= 3) {
                                if (rowData.gkDetails.score !== null) {
                                    return rowData.gkDetails.score;
                                } else {
                                    return (
                                        <button>Schedule L1</button>
                                    );
                                  }
                        } else {
                            return "NA";
                        }
                    case "status":
                        if (rowData.testDetails.score >= 3 && rowData.l1Details.score >= 3) {
                            if (rowData.gkDetails.score !== null) {                            
                                if (rowData.gkDetails.score >= 3) {

                                    var start = new moment(rowData.gkDetails.startTime);
                                    var end = new moment();

                                    if(rowData.gkDetails.endTime !== null && rowData.gkDetails.endTime.length !== 0) {
                                        end = new moment(rowData.gkDetails.endTime);
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
                        } else {
                            return "NA";
                        }   
                    default: break;
                }

            }
        };
        function updateCellBackground(cellValue) {
            if (cellValue === null || cellValue < 3) {
                return '#FA8072'
            } else if(cellValue >= 3 && cellValue <= 5) {
                return '#ADFF2F'
            } else {
                return '#FF7F50'
            }
        }
        const columns = [{
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'experience',
            text: 'Experience'
        }, {
            dataField: 'testDetails.score',
            text: 'Test Score',
            style: (content, rowData, rowIndex, colIndex) => {
                return {
                backgroundColor: updateCellBackground(content)
                };
            }            
        }, {
            dataField: 'testDetails.startTime',
            text: 'Test Status',
            style: (content, rowData, rowIndex, colIndex) => {
                return {    
                backgroundColor: updateCellBackground(rowData.testDetails.score)
                };
            },
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
            style: (content, rowData, rowIndex, colIndex) => {
                let score = rowData.testDetails.score < rowData.l1Details.score ? rowData.testDetails.score :rowData.l1Details.score;        
                return {
                    backgroundColor: updateCellBackground(score)
                };
            },
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
            style: (content, rowData, rowIndex, colIndex) => {
                let score = rowData.testDetails.score < rowData.l1Details.score ? rowData.testDetails.score :rowData.l1Details.score;        
                return {
                    backgroundColor: updateCellBackground(score)
                };
            },
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
            style: (content, rowData, rowIndex, colIndex) => {
                let score = rowData.testDetails.score < rowData.l1Details.score 
                            ? (rowData.testDetails.score < rowData.gkDetails.score ? rowData.testDetails.score : rowData.gkDetails.score)
                            : (rowData.l1Details.score < rowData.gkDetails.score ? rowData.l1Details.score : rowData.gkDetails.score);
                return {
                    backgroundColor: updateCellBackground(score)
                };
            },
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
            style: (content, rowData, rowIndex, colIndex) => {
                let score = rowData.testDetails.score < rowData.l1Details.score 
                            ? (rowData.testDetails.score < rowData.gkDetails.score ? rowData.testDetails.score : rowData.gkDetails.score)
                            : (rowData.l1Details.score < rowData.gkDetails.score ? rowData.l1Details.score : rowData.gkDetails.score);
                return {
                    backgroundColor: updateCellBackground(score)
                };
            },
            editable: (content, row, rowIndex, columnIndex) => {
                return row.gkDetails.score !== "NA" && row.gkDetails.score > 3;
            },
            formatter: columnFormatter,
            formatExtraData: {
                "columnType": "gkDetails",
                "columnField": "status"
            }
        }];

        const cellEdit = cellEditFactory({
            mode: 'dbclick'
        });

        return (
            <BootstrapTable
                keyField="emailId"
                data={MockData.data}
                columns={columns}
                cellEdit={cellEdit}
            />
        );
    };
}

export default CandidateTable;