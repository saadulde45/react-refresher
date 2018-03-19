import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';

const CandidateTable = (props) => {

    const { columns, data, keyField } = props;

    console.log("props", props);

    const cellEdit = cellEditFactory({
        mode: 'dbclick'
    });

    return (
        <BootstrapTable
            keyField={keyField}
            data={data}
            columns={columns}
            cellEdit={cellEdit}
        />
    );
}

export default CandidateTable;