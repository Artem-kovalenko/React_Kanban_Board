import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 6;

let initialState= [
    {
        title:"list 1",
        id: `list-${0}`,
        cards: [
            {
                id:`card-${0}`,
                text:"card 1 in list 1"
            },
            {
                id:`card-${1}`,
                text:"card 2 in list 1"
            }
        ]
    },
    {
        title:"list 2",
        id: `list-${1}`,
        cards: [
            {
                id:`card-${2}`,
                text:"card 1 in list 2"
            },
            {
                id:`card-${3}`,
                text:"card 2 in list 2"
            },
            {
                id:`card-${4}`,
                text:"card 3 in list 2"
            },
            {
                id:`card-${5}`,
                text:"card 4 in list 2"
            }
        ]
    }
]



const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case CONSTANTS.ADD_LIST: {
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            };
            listID += 1
            return [...state, newList];
        }

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text:action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1
            
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };
                } else {
                    return list;
                }
            });
            return newState;
        }

        case CONSTANTS.DRAG_HAPPENED: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;

            const newState = [...state]; //создаим копию стейта чтоб не изменять его напрямую

            // перемещение листов
            if(type === "list") {
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            // в одном листе(если айди один и тот же)
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            // в дургом листе
            if(droppableIdStart !== droppableIdEnd) {
                //найдем лист в котором выбрали карточку для перемещения
                const listStart = state.find(list => droppableIdStart === list.id)

                //вытащим карточку из этого листа
                const card = listStart.cards.splice(droppableIndexStart, 1)

                //найдем лист в который мы перемещаем карточку
                const listEnd = state.find(list => droppableIdEnd === list.id)

                //положем карточку в новый лист
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }

            
            return newState;
        }

        default: 
            return state;
    }
}

export default listsReducer;