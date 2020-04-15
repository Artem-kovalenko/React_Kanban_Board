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

const CreateInput = styled.input`
  width: 100%;
`;
const CreateDiv = styled.div`
  width: 100%;
  height: 80px;
  font-size: 20px;
  padding: 7px;
  box-sizing: border-box;
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: 0 2px 4px grey;
  align-self: center;
  cursor: pointer;
`;

const TrelloCard = React.memo(
  ({ createdTime, boardTitle, listTitle, text, id, listID, boardID, index, dispatch }) => {
    // используем хук
    // если isEditing = true тогда у нас будет рендериться компонент для изменения карточки (TrelloForm)
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);
    const [cardIsEditing, setCardIsEditing] = useState(false);

    const closeForm = (e) => {
      setIsEditing(false);
    };

    const handleChange = (e) => {
      setText(e.target.value);
    };

    // по нажатию на кнопку save убрать поле редактирования
    const saveCard = (e) => {
      e.preventDefault();
      dispatch(editCard(id, listID, cardText));
      setIsEditing(false);
    };

    const handleDeleteCard = (e) => {
      console.log(listID);
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
                  >
                    edit
                  </EditButton>
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
            <div>
              Board - "{boardTitle}" / List - "{listTitle}" /
            </div>

            <div>
              <div onDoubleClick={() => setCardIsEditing(true) }>
                {cardIsEditing ? renderEditForm(): text}
              </div>
            </div>
            <div className='form-field-wrapper'>
              <div className='task-details'>
                {`Column: ${listTitle}`}
              </div>
              <div className='task-details'>
                {`Created: ${createdTime ? new Date(createdTime).toLocaleString() : ''}`}
              </div>
              
          </div>
          </Modal>
        </div>
      );
    };
    return isEditing ? renderEditForm() : renderCard();
  }
);
// <button onClick={closeModal}>Cancel</button>
export default connect()(TrelloCard);
