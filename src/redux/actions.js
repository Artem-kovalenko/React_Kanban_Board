const ADD_BOARD = "ADD_BOARD";
const DELETE_BOARD = "DELETE_BOARD";

const ADD_CARD = "ADD_CARD";
const ADD_LIST = "ADD_LIST";
const DRAG_HAPPENED = "DRAG_HAPPENED";
const EDIT_CARD = "EDIT_CARD";
const DELETE_CARD = "DELETE_CARD";
const EDIT_LIST_TITLE = "EDIT_LIST_TITLE";
const DELETE_LIST = "DELETE_LIST";
const SET_ACTIVE_BOARD = "SET_ACTIVE_BOARD";

// ACTIONS
export const actionAddBoard = (board) => {
    return { type: ADD_BOARD, payload: board };
};

export const actionDeleteBoard = (boardId) => {
    return { type: DELETE_BOARD, payload: boardId };
};




const initialState = {
    boards: [],
    lists: [],
    cards: [],
};


// REDUCERS
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOARD: {
            return {
                ...state,
                boards: state.boards.concat(action.payload),
            }
        }
        case DELETE_BOARD: {
            return {
                ...state,
                boards: state.boards.filter(board => board.id !== action.payload),  
            }
        }
        default:
            return state;
    }
}

export default rootReducer

