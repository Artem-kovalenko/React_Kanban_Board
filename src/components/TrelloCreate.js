import React from "react";
import Icon from "@material-ui/core/Icon";
import TrelloButton from "./TrelloButton";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import styled from "styled-components";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
  state = {
    formOpen: false,
    text: "",
    createdTime: new Date()
  };

  // при нажатии на Add поменять formOpen на true и показать поле
  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };
  // принажатии куда-либо кроме поля ввода - убрать его
  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  //function for dispatching the action
  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: "",
      });
      dispatch(addList(text));
    }
    return;
  };

  handleAddCard = () => {
    
    const { dispatch, listID } = this.props;
    const { text, createdTime } = this.state;

    if (text) {
      this.setState({
        text: "",
        createdTime: new Date()
      });
      dispatch(addCard(listID, text, createdTime));
    }
    
  };

  // создает кнопку добавить новую карточку или новый список (Add another card/list)
  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonTextOpacity};
      color: ${buttonTextColor};
      background-color: ${buttonTextBackground};
    `;
    return (
        <OpenFormButton onClick={this.openForm}>
          <Icon>add</Icon>
          <p style={{ flexShrink: 0 }}>{buttonText}</p>
        </OpenFormButton>
      );
    };
    render() {
        const { text } = this.state;
        const { list } = this.props;
        return this.state.formOpen ? (
          <TrelloForm
            text={text}
            onChange={this.handleInputChange}
            closeForm={this.closeForm}
          >
            <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
              {list ? "Add List" : "Add Card"}
            </TrelloButton>
          </TrelloForm>
        ) : (
          <TrelloOpenForm list={list} onClick={this.openForm}>
            {list ? "Add another list" : "Add another card"}
          </TrelloOpenForm>
        );
      }


}


export default connect()(TrelloCreate);