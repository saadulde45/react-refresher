import MockData from '../mock-data.json';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_CANDIDATES":
            console.log("reducer", state, MockData.data, action);
            return Object.assign({}, state, {
                "candidates": MockData.data
            });
        case "UPDATE_TEST_SCORE":
            return Object.assign({}, state, {
                "candidates": action.payload
            });
        default:
            return state;
    }

}

export default userReducer;