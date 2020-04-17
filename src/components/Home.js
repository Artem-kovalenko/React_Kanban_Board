import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 28px;
  color: black;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 20px;
  padding: 7px;
  box-sizing: border-box;
  border-radius: 5px;
  border: none;
  outline-color: grey;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const TextButton = styled.button`
  margin-left: -89px;
  padding: 18px;
  border: 1px solid black;
  outline: none;
  background: #ffcc3bf2;
  border-radius: 15px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 20px;
  color: black;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fffcdd;
  }
`;

const Home = ({ boards, boardOrder, dispatch }) => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewBoardTitle("")
    dispatch(addBoard(newBoardTitle));
  };

  // const show = () => {
  //   console.log(boards)
  //   console.log(boardOrder)
  // }

  const renderBoards = () => {  
    return boardOrder.map((boardID, index) => {
      const board = boards[boardID]
      return (
        <div key={boardID}>
          <Link
            to={`/board/${board.id}`}
            style={{ textDecoration: "none" }}
          >
          <BoardThumbnail 
            boardID={boardID}
            index={index}  
            {...board} 
            />
          </Link>
         
        </div>  
      );
    });
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{textAlign: "center" }}>
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
        <TextButton>Add</TextButton>
      </form>
    );
  };

  return (
    <HomeContainer>
    <Thumbnails>{renderBoards()}</Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});
export default connect(mapStateToProps)(Home);
