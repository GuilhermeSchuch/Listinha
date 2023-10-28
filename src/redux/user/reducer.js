import UserActionTypes from "./action-types";


const initialState = {
  currentUser: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LANGUAGE:
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
}

export default userReducer;