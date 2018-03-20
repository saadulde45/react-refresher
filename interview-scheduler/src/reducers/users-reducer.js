import MockData from '../mock-data.json';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_CANDIDATES":
            console.log("reducer", state, MockData.data, action);
            return Object.assign({}, state, MockData.data);
        default:
            return state;
    }

}

export default userReducer;