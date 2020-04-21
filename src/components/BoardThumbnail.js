import React from "react";
import styled from "styled-components";


const Thumbnail = styled.div`
  min-height: 150px;
  width: 100px;
  background: #ffcc3bf2;
  padding: 10px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px grey;
  display: flex;
  flex-direction: column;
  justify-content: space-around
`;

const Title = styled.h4`
  color: black;
  text-decoration: none;
  text-transform: capitalize;
  word-break: break-all;
`;

const TextButton = styled.button`
  min-width: 80px;
  padding: 2px;
  border: 1px solid #333333;
  outline: none;
  background: none;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1.1rem;
  color: #333333;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #fffcdd;
  }
`;

export default function BoardThumbnail(props) {

  const { board, deleteBoard, clickBoard } = props


  return (
    <div>
    <Thumbnail onClick={clickBoard}>
      <Title>{board.title}</Title>
      
    </Thumbnail>
    <TextButton onClick={deleteBoard}>Delete</TextButton>
    </div>
  );
};

