import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import MockData from './mock-data.json';
import moment from 'moment';

class CandidateTable extends Component {

    render() {

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
            text: 'Test Start',
            editable: (content, row, rowIndex, columnIndex) => {
                return row.testDetails.score > 3;
            },
            formatter: (cell, row) => {

                if (row.testDetails.score < 3) {
                    return "Rejected";
                } else {
                    return "Selected";
                }
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