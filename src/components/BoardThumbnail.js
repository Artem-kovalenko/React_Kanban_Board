import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  height: 150px;
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
`;

const Title = styled.h4`
  color: black;
  text-decoration: none;
  text-transform: capitalize;
`;

const BoardThumbnail = ({ title }) => {
  console.log(title);
  return (
    <Thumbnail>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;