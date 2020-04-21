import React from "react";
import styled from "styled-components";
import BoardThumbnailContainer from "../containers/BoardThumbnailContainer"

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

export default function Home( props ) {
  
  const {renderCreateBoard, boards} = props

 
  return (
    <HomeContainer>
    <Thumbnails>{boards && boards.length > 0 && boards.map(board => <BoardThumbnailContainer key={board.id} boardId={board.id} /> )}</Thumbnails>
      {renderCreateBoard()}
    </HomeContainer>
  );
};


