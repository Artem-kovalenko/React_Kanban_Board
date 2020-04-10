import React, { Component, PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
// import TrelloActionButton from "./TrelloActionButton";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;


// TODO: Fix performance issue
class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h2>Hello kanban</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <ListContainer 
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <TrelloList
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <TrelloCreate list />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  // lists попадает в сейт из редьюсера index.js, там lists появляется из редьюсера listsReducer, измененный после определенного action
  lists: state.lists,
});

export default connect(mapStateToProps)(App); // здесь передаём state в App и можем использовать в нём же, или в следующих компонентах
