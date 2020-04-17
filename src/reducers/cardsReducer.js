import { CONSTANTS } from "../actions";


const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
        const { text, listID, id, createdTime } = action.payload;

        const newCard = {
          text,
          id: `card-${id}`,
          list: listID,
          createdTime: createdTime,
          editedTime: "",
          cardDescriptionText:""
        };
        return { ...state, [`card-${id}`]: newCard };
    }

    case CONSTANTS.EDIT_CARD: {
        const{ id, newText, editedTime, cardDescriptionText} = action.payload;
        const card = state[id];
        card.text = newText;
        card.editedTime = editedTime;
        card.cardDescriptionText = cardDescriptionText;
        return{ ...state, [`card-${id}`]:card}
    }

    case CONSTANTS.DELETE_CARD: {
      // this reducer is deleting cards from CARDS:
      // alert("delete from CARDSREDUCER")
        const { id } = action.payload;
        const newState = state;
        delete newState[id];
        console.log(newState)
        return newState;
        // return state;
    }
    default:
      return state;
  }
};

export default cardsReducer;