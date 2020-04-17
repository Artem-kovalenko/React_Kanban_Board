import { CONSTANTS } from "../actions";


const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case CONSTANTS.ADD_BOARD: {
            return [...state, `board-${action.payload.id}`]
        }

        case CONSTANTS.DELETE_BOARD: {
            const { index } = action.payload;
            delete state[index];
            let newState = state.filter(board => board !== undefined)
            return newState;
        }
        default:
            return state;
    }
}

export default boardOrderReducer;