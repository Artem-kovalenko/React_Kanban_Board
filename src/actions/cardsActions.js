import { CONSTANTS } from "../actions"
import { v4 as uuidv4 } from 'uuid';

export const addCard = (listID, text, createdTime) => {
    const id = uuidv4();
    return {
        type:CONSTANTS.ADD_CARD,
        payload: { text, listID, id, createdTime }
    };
};

export const editCard = (id, listID, newText, editedTime, cardDescriptionText) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload:{ id, listID, newText, editedTime, cardDescriptionText }
    };
};

export const deleteCard = (id, listID) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload:{ id, listID }
    }
}

