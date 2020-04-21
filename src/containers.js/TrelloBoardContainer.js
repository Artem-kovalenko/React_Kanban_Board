import React from 'react'
import { withRouter } from "react-router";
import { useSelector } from 'react-redux'
import TrelloBoard from '../components/TrelloBoard';


function TrelloBoardContainer(props) {
    const { match: { params:  {boardId} }, history } = props;

    const board = useSelector(state => state.boards.find(board => board.id === boardId))
    
    function backToBoards() {
        history.push(`/`)
    }

    if(board) {
        return <TrelloBoard board={board} backToBoards={backToBoards} />
    }
    return <div>Board not found123</div>

}

export default withRouter(TrelloBoardContainer)