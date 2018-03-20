import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
                        if (rowData.l1Details.score !== null) {
                            
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
        };

        const columns = [{
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

        const cellEdit = cellEditFactory({
            mode: 'dbclick'
        });


        let getSizePerPageList = () =>{
            let requestedSizePerPage = MockData.recordsPerPage
            let totalRecords = MockData.totalRecords
            let pageListLimit = Math.floor(totalRecords/5)
            let sizePerPageListArr = []
            for(var i=1; i<pageListLimit; i++){
                var sizePerPageListObj = {};
                    sizePerPageListObj.text = 5*i;
                    sizePerPageListObj.value = 5*i;
                sizePerPageListArr.push(sizePerPageListObj)
                if(i===(pageListLimit-1)){
                     var sizePerPageListObj = {};
                    sizePerPageListObj.text = 'All';
                    sizePerPageListObj.value = totalRecords;
                    sizePerPageListArr.push(sizePerPageListObj)
                }
            }
         return sizePerPageListArr;
        }
        
        const options = {
            paginationSize: 2, //page no on UI in box like 1,2,Next, Last  
            pageStartIndex: 1, // starting Page Index
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            sizePerPageList: getSizePerPageList() // A numeric array is also available. the purpose of above example is custom the text
        };
    
        return (
            <BootstrapTable
                keyField="emailId"
                data={MockData.data}
                columns={columns}
                cellEdit={cellEdit}
                pagination={ paginationFactory(options) }
            />
        );
    };
}

export default CandidateTable;