import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 4;

let initialState= [
    {
        title:"list 1",
        id: 0,
        cards: [
            {
                id:0,
                text:"card 1 in list 1"
            },
            {
                id:1,
                text:"card 2 in list 1"
            }
        ]
    },
    {
        title:"list 2",
        id: 1,
        cards: [
            {
                id:0,
                text:"card 1 in list 2"
            },
            {
                id:1,
                text:"card 2 in list 2"
            },
            {
                id:2,
                text:"card 3 in list 2"
            },
            {
                id:3,
                text:"card 4 in list 2"
            }
        ]
    }
]



const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: listID
            }
            listID += 1
            return [...state, newList];

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text:action.payload.text,
                id:cardID
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

        default:  ;
            return state;
    }
}

export default listsReducer;