const getCandidates = (candidates) => ({
    type: "GET_CANDIDATES",
    payload: candidates
});

export default getCandidates;