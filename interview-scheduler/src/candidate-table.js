import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import MockData from './mock-data.json';

class CandidateTable extends Component {

    render() {

        const cellEdit = {
            mode: 'dbclick' // double click cell to edit
        };

        const interviewFormatter = function(cell, row, enumObject) {
            if(enumObject === "duration") {
                if(cell.score > 2 && cell.endTime) {
                    return "Ended";
                } else if(cell.score > 2 && cell.startTime) {
                    return "Started";
                } else {
                    return "Rejected";
                }
            }

            var temp = [];

            if(enumObject === "score") {
                console.log(enumObject, cell);
                temp = cell[enumObject];

                console.log("after", cell, row);
            }

            return temp;
        };

        return (
            <div>
                <BootstrapTable data={MockData.data} striped={true} hover={true} cellEdit={cellEdit}>
                    <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Candidate Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="experience" dataSort={true}>Experience</TableHeaderColumn>
                    <TableHeaderColumn dataField="testDetails" dataFormat={interviewFormatter} formatExtraData={ 'score' }>Test Score</TableHeaderColumn>
                    <TableHeaderColumn dataField="testDetails" dataFormat={interviewFormatter} formatExtraData={ 'duration' }>Test Result</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default CandidateTable;