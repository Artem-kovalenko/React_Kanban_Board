import React, { useState, useEffect } from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editTitle } from "../actions";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`;

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState("title");

  const StyledInput = styled.input`
    width: 100%;
    border: none;
    outline-color: blue;
    border-radius: 3px;
    margin-bottom: 3px;
    padding: 5px;
  `;

  // FIXME: Why does it delete the input on every letter I type in?

  const renderEditInput = () => {
    return (
      <StyledInput
        type="text"
        value={listTitle}
        onChange={handleChange}
        autoFocus
        // onFocus={handleFocus}
        onBlur={handleFinishEditing}
      />
    );
  };

  // const handleFocus = e => {
  //   console.log("hi");

  //   e.target.select();
  // };

  const handleChange = e => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = e => {
    setIsEditing(false);
    dispatch(editTitle(listID, listTitle))  
  }  

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer   
        {...provided.draggableProps} 
        ref={provided.innerRef} 
        {...provided.dragHandleProps} 
        >
          <Droppable droppableId={String(listID)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} >
              
                {isEditing ? ( //если listEditing значит мы редактируем заголовок и нужно отобразить поле, 
                              //если нет то просто показать заголовок с возможностью кликнуть на него и поставить isEditing в тру чтоб редактировать
                  renderEditInput()
                ) : (
                  <h4 onClick={() => setIsEditing(true)}>{listTitle}</h4>
                )}  

                {cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    text={card.text}
                    id={card.id}
                    index={index}
                    listID={listID}
                  />
                ))}
                {provided.placeholder}
                <TrelloCreate listID={listID} />   
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default connect()(TrelloList);
