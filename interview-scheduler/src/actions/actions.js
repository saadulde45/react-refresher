const getCandidates = (candidates) => ({
    type: "GET_CANDIDATES",
    payload: candidates
});

export const updateTestScore = (newData) => ({
    type: "UPDATE_TEST_SCORE",
    payload: newData
});

export default getCandidates;