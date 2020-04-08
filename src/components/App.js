import React, { Component } from "react";
import TrelloList from "./TrelloList"
import { connect } from "react-redux"
import TrelloActionButton from "./TrelloActionButton"

class App extends Component  {
  render() {

    const { lists } = this.props
    return (
      <div className="App">
        <h2>Hello kanban</h2>
        <div  style={styles.appContainer}>
          {lists.map(list => (
            <TrelloList 
            listID={list.id}
            key={list.id} 
            title={list.title} 
            cards = {list.cards} 
            />
          ))}
          <TrelloActionButton list />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ // lists попадает в сейт из редьюсера index.js, там lists появляется из редьюсера listsReducer, измененный после определенного action
  lists: state.lists
})

const styles = {
  appContainer: {
    display:"flex"
  }
}

export default connect (mapStateToProps)(App); // здесь передаём state в App и можем использовать в нём же, или в следующих компонентах
