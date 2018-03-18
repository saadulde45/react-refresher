import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import MockData from './mock-data.json';

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
        }];

        return (
            <BootstrapTable
                keyField="emailId"
                data={MockData.data}
                columns={columns}
                cellEdit={cellEditFactory({ mode: 'dbclick' })}
            />
        );
    };
}

export default CandidateTable;