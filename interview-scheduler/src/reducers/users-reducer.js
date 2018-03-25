import MockData from '../mock-data.json';

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case "GET_CANDIDATES":
            return Object.assign({}, state, {
                "candidates": MockData.data
            });
        case "UPDATE_TEST_SCORE":
            return (
                Object.assign({}, state, {
                    "candidates": updateTestScore(action.payload, state)
                })
            );
        default:
            return state;
    }

}

function updateTestScore(row, state) {
    let dataField = row.cellEdit.dataField.split('.');
    let newData = state.candidates.map(candidate => {
        if (candidate.emailId === row.cellEdit.rowId) {
            if (row.cellEdit.dataField) {
                candidate[dataField[0]][dataField[1]] = row.cellEdit.newValue;
            }
        }
        return candidate;
    });

    return newData;
}



export default userReducer;