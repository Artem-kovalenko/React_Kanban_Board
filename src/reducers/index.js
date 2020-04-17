import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";

export default combineReducers({
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer,
});
