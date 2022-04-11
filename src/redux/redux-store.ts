import {Action, applyMiddleware, combineReducers} from "redux"
import profileReducer from "./profile/profile-reducer"
import dialogsReducer from "./dialogs/dialogs-reducer"
import sidebarReducer from "./sidebar/sidebar-reducer"
import usersReducer from "./users/users-reducer"
import authReducer from "./auth/auth-reducer"
import appReducer from "./app/app-reducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import { compose } from 'redux'
import newsReducer from "./news/news-reducer"
import chatReducer from "./chat/chat-reducer"

const { createStore } = require("redux")

let rootReducer = combineReducers({ // Соединяет все reducer'ы в store
    profilePage: profileReducer, 
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    news: newsReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer; //(globalstate: GLOBALSTATE) => GLOBALSTATE 
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware))) 
//thunk middlle ware перехватывает thunk'и, делает некоторые настройки, потому что в store диспатчить можно только action'ы, так как store не умеет вызывать функции

export default store