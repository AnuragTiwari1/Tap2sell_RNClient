const initialState = {
  leagueList: [],
};
const userReducer = (
  state = initialState,
  {type}: {type: any; payload: any},
) => {
  switch (type) {
    default:
      return state;
  }
};

export default userReducer;
