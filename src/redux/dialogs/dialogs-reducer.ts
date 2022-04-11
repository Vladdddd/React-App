import { InferActionsTypes } from "../redux-store"

type DialogType = {
    id: number
    name?: string
}

type MessageType = {
    id: number
    mess?: string 
    time?: string //return time [64] & error ?
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmytro' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Ostap' },
        { id: 4, name: 'Gacher' },
        { id: 5, name: 'Valen' }
    ] as Array<DialogType>,

    messages: [
        { id: 1, mess: 'Hey <3', time: '2 mins ago' },
        { id: 2, mess: 'How are you', time: '2 hours ago' },
        { id: 3, mess: 'Yo', time: '17 hours ago' },
        { id: 4, mess: 'What are you doing, broy', time: '2 days ago' },
        { id: 5, mess: 'Nice to meet you', time: '3 days ago' }
    ] as Array<MessageType>,

    newMessageText: '' as string | undefined //undefined?
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/UPDATE-MESSAGE':
            
            return {
                ...state,
                newMessageText: action.message
            };;

        case 'SN/DIALOGS/ADD-MESSAGE':

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

export const actions = {
    updateNewMessageText: (message: string) => ({ type: 'SN/DIALOGS/UPDATE-MESSAGE', message: message } as const),
    addMessage: (newMessageText: string) => ({ type: 'SN/DIALOGS/ADD-MESSAGE', newMessageText } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>