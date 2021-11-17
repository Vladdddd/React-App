const UPDATE_MESSAGE = 'UPDATE-MESSAGE';
const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmytro' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Ostap' },
        { id: 4, name: 'Gacher' },
        { id: 5, name: 'Valen' }
    ],

    messages: [
        { id: 1, mess: 'Hey <3', time: '2 mins ago' },
        { id: 2, mess: 'How are you', time: '2 hours ago' },
        { id: 3, mess: 'Yo', time: '17 hours ago' },
        { id: 4, mess: 'What are you doing, broy', time: '2 days ago' },
        { id: 5, mess: 'Nice to meet you', time: '3 days ago' }
    ],

    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_MESSAGE:
            
            return {
                ...state,
                newMessageText: action.message
            };;

        case ADD_MESSAGE:

            let newMessage = {
                id: 6,
                mess: action.newMessageText
            };

            return{
                ...state,
                messages: [ ...state.messages, newMessage ]
            };

        default:
            return state;
    }

}

export const updateNewMessageTextActionCreator = (message) => {
    return {
        type: UPDATE_MESSAGE,
        message: message
    }
}

export const addMessageActionCreator = (newMessageText) => {
    return {
        type: ADD_MESSAGE,
        newMessageText
    }
}

export default dialogsReducer;