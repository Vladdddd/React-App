import { Dispatch } from "redux";
import { chatAPI, ChatMessageType, StatusType } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { v1 } from 'uuid'


type MessageType = ChatMessageType & {id: string}

let initialState = {// "Стартовый"/ инициализационный/ начальный state
    messages: [] as MessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED': { //В JS, если не делать константы - можно ошибиться. В ts ошибиться нельзя(ts подсказывает и выводит ошибку)
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                .filter((m, index, arr) => index >= arr.length - 100 ) 
            }
        }

        case 'SN/CHAT/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }

        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({ type: 'SN/CHAT/MESSAGES_RECEIVED', payload: { messages } } as const),
    statusChanged: (status: StatusType) => ({ type: 'SN/CHAT/STATUS_CHANGED', payload: { status } } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType, void>