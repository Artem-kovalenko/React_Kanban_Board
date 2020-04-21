import React from "react";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BoardThumbnail from "../components/BoardThumbnail"
import { dispatchDeleteBoard } from "../redux/dispatchers"


function BoardThumbnailContainer (props)  {

    const { boardId, history } = props;

    const board = useSelector(state => state.boards.find(board => board.id === boardId));

    const dispatch = useDispatch();

    function deleteBoard() {
        dispatchDeleteBoard(dispatch, boardId);
    }

    function clickBoard() {
        history.push(`board/${boardId}`);
    }


  return (
    <BoardThumbnail board={board} deleteBoard={deleteBoard} clickBoard={clickBoard} />
  );
};

export default withRouter(BoardThumbnailContainer);