import {
    actionAddBoard,
    actionDeleteBoard
} from "./actions"


export function disptachAddBoard(dispatch, board) {
    dispatch(actionAddBoard(board))
}

export function dispatchDeleteBoard(dispatch, boardId) {
    dispatch(actionDeleteBoard(boardId))
}