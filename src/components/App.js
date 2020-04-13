import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
// import TrelloActionButton from "./TrelloActionButton";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import Routes from "../routes";


class App extends PureComponent {

  render() {
    return <Routes />;
  }
}

export default App; // здесь передаём state в App и можем использовать в нём же, или в следующих компонентах
