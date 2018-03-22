import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import overlayFactory from 'react-bootstrap-table2-overlay';

const CandidateTable = (props) => {

    const { columns, data, keyField, loading, onTableChange, defaultSorted, mobile } = props;

    const cellEdit = cellEditFactory({
        mode: mobile ? 'click' : 'dbclick'
    });

    return (
        <BootstrapTable
            remote={{ cellEdit: true }}
            keyField={keyField}
            data={data}
            columns={columns}
            cellEdit={cellEdit}
            loading={loading}
            onTableChange={onTableChange}
            noDataIndication={() => {
                if (!loading && data.length === 0) {
                    return (<div>sorry no data </div>);
                }
            }
            }
            overlay={overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' })}
            defaultSorted={defaultSorted}
        />
    );
}

export default CandidateTable;