import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { disptachAddBoard } from "../redux/dispatchers";
import { v4 as uuidv4 } from "uuid";
import Home from "../components/Home";
import styled from "styled-components";

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

function HomeContainer(props) {
  const boards = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(boards);
    e.preventDefault();
    let newBoard = {
      id: uuidv4(),
      title: newBoardTitle,
    };
    setNewBoardTitle("");
    disptachAddBoard(dispatch, newBoard);
  };

  const show = () => {
    console.log(boards);
  };

  const renderCreateBoard = () => {
    return (
      <div>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <CreateTitle>Create a new Board</CreateTitle>
          <CreateInput
            onChange={handleChange}
            value={newBoardTitle}
            placeholder="Your boards title..."
            type="text"
          />
          <TextButton>Add</TextButton>
        </form>
        <button onClick={show}>Show</button>
      </div>
    );
  };

  return <Home 
    renderCreateBoard={renderCreateBoard} 
    boards={boards}
    />
}

export default withRouter(HomeContainer);
