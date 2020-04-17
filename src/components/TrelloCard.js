import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import TrelloForm from "./TrelloForm";
import { editCard, deleteCard } from "../actions";
import { connect } from "react-redux";
import TrelloButton from "./TrelloButton";
import Modal from "./Modal";

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const CreateDiv = styled.div`
  width: 96%;
  padding: 15px 15px 15px 24px;
  margin: 20px 6px ;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  background-color: #d8d8d8;
  transition: .3s;
  border-radius:5px;
  
`;

const TextButton = styled.button`
  min-width: 80px;
  padding: 2px;
  margin: 50px 10px 0 0;
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

const EditDescriptionButton = styled.div`
  width: 40%;
  padding: 2px 8px;
  margin: 19px 0px -6px -16px;
  border: 1px solid #333333;
  outline: none;
  background: none;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.9rem;
  color: black;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #ffffff;
  }
`;

const TrelloCard = React.memo(
  ({
    editedTime,
    createdTime,
    boardTitle,
    listTitle,
    text,
    descriptionText,
    id,
    listID,
    index,
    dispatch,
  }) => {
    // используем хук
    // если isEditing = true тогда у нас будет рендериться компонент для изменения карточки (TrelloForm)
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);
    const [cardIsEditing, setCardIsEditing] = useState(false);
    const [cardDescriptionText, setCardDescriptionText] = useState(descriptionText);
    const [cardDescriptionIsEditing, setCardDescriptionIsEditing] = useState(false);

    const closeForm = (e) => {
      setIsEditing(false);
      setCardIsEditing(false);
      setCardDescriptionIsEditing(false);
    };

    const handleChange = (e) => {
      setText(e.target.value);
    };
   
    // по нажатию на кнопку save убрать поле редактирования
    const saveCard = (e) => {
      let editedTime = new Date();
      e.preventDefault();
      dispatch(editCard(id, listID, cardText, editedTime, cardDescriptionText));
      setIsEditing(false);
      setCardIsEditing(false);
    };
    
    const handleDeleteCard = (e) => {
      dispatch(deleteCard(id, listID));
    };

    const renderEditForm = () => {
      return (
        <TrelloForm
          text={cardText}
          onChange={handleChange}
          closeForm={closeForm}
        >
          <TrelloButton onClick={saveCard}>Save</TrelloButton>
        </TrelloForm>
      );
    };

    // -----------------------------------

    const handleDescriptionChange = (e) => {
      setCardDescriptionText(e.target.value);
    };

    const saveDescription = (e) => {
      let editedTime = new Date();
      e.preventDefault();
      dispatch(editCard(id, listID, cardText, editedTime, cardDescriptionText));
      setCardDescriptionIsEditing(false);
    } 

    const renderDescriptionForm = () => {
      return (
        <TrelloForm
          text={cardDescriptionText}
          onChange={handleDescriptionChange}
          closeForm={closeForm}
        >
          <TrelloButton onClick={saveDescription}>Save</TrelloButton>
        </TrelloForm>
      );
    };

    const modalRef = React.useRef();
    const renderCard = () => {
      const openModal = () => {
        modalRef.current.openModal();
      };
      const closeModal = () => {
        modalRef.current.closeModal();
      };

      return (
        <div>
          <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
              <CardContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsEditing(true)}
                onClick={openModal}
              >
                <Card>
                  <EditButton
                    onMouseDown={() => setIsEditing(true)}
                    fontSize="small"
                  >edit</EditButton>
                  <DeleteButton fontSize="small" onMouseDown={handleDeleteCard}>
                    delete
                  </DeleteButton>
                  <CardContent>
                    <Typography gutterBottom>{text}</Typography>
                  </CardContent>
                </Card>
              </CardContainer>
            )}
          </Draggable>

          <Modal ref={modalRef}>
            <div className="card-position">
              Board - "{boardTitle}" / List - "{listTitle}" /
            </div>
            <hr />
            <div className="card-info">
              <CreateDiv className="card-title" onDoubleClick={() => setCardIsEditing(true)}>
                {cardIsEditing ? renderEditForm() : text}
              </CreateDiv>
              <CreateDiv  className="card-description" onDoubleClick={() => setCardDescriptionIsEditing(true)}>
                {cardDescriptionIsEditing ?  renderDescriptionForm() : descriptionText}
                {cardDescriptionIsEditing ? null : <EditDescriptionButton onClick={() => setCardDescriptionIsEditing(true)}>{descriptionText ? "Edit Description" : "Add Description"} </EditDescriptionButton>}
              </CreateDiv>
            </div>
            <hr />
            <div className="form-field-wrapper">
              <div className="card-details">{`Column: ${listTitle}`}</div>
              <div className="card-details">
                {`Created: ${
                  createdTime ? new Date(createdTime).toLocaleString() : ""
                }`}
              </div>
              <div className="card-details">
                {`Edited: ${
                  editedTime ? new Date(editedTime).toLocaleString() : ""
                }`}
              </div>
            </div>
            <hr />
            <div className="button-panel">
              <TextButton onClick={closeModal}>Cancel</TextButton>
              <TextButton onClick={handleDeleteCard}>Delete</TextButton>
            </div>
          </Modal>
        </div>
      );
    };
    return isEditing ? renderEditForm() : renderCard();
  }
);

export default connect()(TrelloCard);
