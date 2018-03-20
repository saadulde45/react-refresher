import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import overlayFactory from 'react-bootstrap-table2-overlay';

const CandidateTable = (props) => {

    const { columns, data, keyField, loading } = props;

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
            loading={loading}
            noDataIndication={ () => {
                    if(!loading && data.length === 0) {
                        return (<div>sorry no data </div>);
                    }
                }
            }
            overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
        />
    );
}

export default CandidateTable;